/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { Package } from '@lerna/package';
import { Project } from '@lerna/project';
import chalk from 'chalk';
import { Command } from 'commander';
import { promises as fsp } from 'fs';
import { resolve } from 'path';
import { writeJsonFile } from 'write-json-file';

interface IPackage {
    version?: string;
    name: string;
}

interface IPackageLock extends IPackage {
    lockfileVersion?: number;
    packages?: { [key: string]: IPackage };
}

/**
 * @param projectPath
 * @param opts
 * @param opts.verbose
 * @param cmdInfo
 */
export async function fixVersionCommand(projectPath: string, opts: { verbose?: boolean }, cmdInfo: Command): Promise<void> {
    const verbose: boolean = opts?.verbose || false;
    const project: Project = new Project(projectPath);
    if (project.manifest == undefined) {
        console.log(`${chalk.yellow('Directory has no manifest')}`);
    } else {
        console.log(`Found lerna project: ${project.manifest.get('name')}`);
    }
    if (verbose) {
        console.log(`at: ${project.rootPath}`);
    }
    const packages: Package[] = await project.getPackages();
    console.log(`Project contains ${packages.length === 0 ? chalk.yellow(packages.length) : chalk.green(packages.length)} packages`);
    for (const pkg of packages) {
        console.group(`Checking Package ${pkg.get('name')}`);
        try {
            if (verbose) {
                console.log(`at: ${pkg.location}`);
            }
            const packageLockPath: string = resolve(pkg.location, 'package-lock.json');
            const fileContent: string = await fsp.readFile(packageLockPath, 'utf-8');
            const parsedFileContent: IPackageLock = JSON.parse(fileContent) as IPackageLock;
            if (
                parsedFileContent?.lockfileVersion === 2 &&
                parsedFileContent?.packages?.[''] &&
                parsedFileContent.packages['']?.version !== pkg.version
            ) {
                parsedFileContent.packages[''].version = pkg.version;
                console.log(`Package needs fixing!`);
                await writeJsonFile(packageLockPath, parsedFileContent, {
                    detectIndent: true,
                    indent: 2,
                });
            } else {
                console.log(`Package doesn't need fixing!`);
            }
        } catch (err: unknown) {
            console.error('Error');
        }
        console.groupEnd();
    }
}
