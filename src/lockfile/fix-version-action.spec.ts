/*
 * Package @donmahallem/lerna-fixer
 * Source https://donmahallem.github.io/lerna-fixer/
 */

import { expect } from 'chai';
import chalk from 'chalk';
import { Command } from 'commander';
import { promises as fsp } from 'fs';
import 'mocha';
import { resolve } from 'path';
import sinon from 'sinon';
import { joinLog } from '../join-log.spec';
import { fixVersionCommand } from './fix-version-action';

/* eslint-disable  @typescript-eslint/no-unsafe-argument */
describe('handle.ts', () => {
    let sandbox: sinon.SinonSandbox;
    before((): void => {
        sandbox = sinon.createSandbox();
    });

    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('handle', (): void => {
        let logStub: sinon.SinonStub<Parameters<typeof console.log>, void>;
        let groupStub: sinon.SinonStub<Parameters<typeof console.group>, void>;
        let groupEndStub: sinon.SinonStub<Parameters<typeof console.groupEnd>, void>;
        let readFileStub: sinon.SinonStub<Parameters<typeof fsp['readFile']>, ReturnType<typeof fsp['readFile']>>;
        before((): void => {
            logStub = sandbox.stub(console, 'log');
            groupStub = sandbox.stub(console, 'group');
            groupEndStub = sandbox.stub(console, 'groupEnd');
            readFileStub = sandbox.stub(fsp, 'readFile');
        });
        after((): void => {
            logStub.restore();
            groupStub.restore();
            groupEndStub.restore();
            readFileStub.restore();
        });
        afterEach('check if called equally', (): void => {
            expect(groupStub.callCount).to.equal(groupEndStub.callCount, 'group and groupEnd should be called equally');
        });
        describe('empty lerna repository', (): void => {
            it('should output absolute path with verbose enabled', async (): Promise<void> => {
                const cmd: Command = new Command('test');
                cmd.option('-v, --verbose').parse(['--verbose'], { from: 'user' });
                await fixVersionCommand('./', cmd.opts(), cmd);
                expect(joinLog(logStub)).to.equal(
                    'Found lerna project: @donmahallem/lerna-fixer\n' +
                        `at: ${resolve('./')}\n` +
                        `Project contains ${chalk.yellow(0)} packages`
                );
            });
            it('should output absolute path with verbose disabled', async (): Promise<void> => {
                const cmd: Command = new Command('test');
                cmd.option('-v, --verbose').parse([], { from: 'user' });
                await fixVersionCommand('./', cmd.opts(), cmd);
                expect(joinLog(logStub)).to.equal(
                    'Found lerna project: @donmahallem/lerna-fixer\n' + `Project contains ${chalk.yellow(0)} packages`
                );
            });
            afterEach('Check for group calls', (): void => {
                expect(groupStub.callCount).to.equal(0, 'No groups should be created');
            });
        });

        describe('lerna repository with packages', (): void => {
            it('should output absolute path with verbose enabled', async (): Promise<void> => {
                readFileStub.resolves('{}');
                const cmd: Command = new Command('test');
                cmd.option('-v, --verbose').parse(['--verbose'], { from: 'user' });
                await fixVersionCommand('./tests', cmd.opts(), cmd);
                expect(joinLog(logStub, groupStub)).to.equal(
                    chalk.yellow('Directory has no manifest') +
                        '\n' +
                        `at: ${resolve('./tests')}\n` +
                        `Project contains ${chalk.green(2)} packages\n` +
                        `Checking Package pkg1\n` +
                        `at: ${resolve('./tests/packages/pkg1')}\n` +
                        `Package doesn't need fixing!\n` +
                        `Checking Package @anyscope/pkg3\n` +
                        `at: ${resolve('./tests/packages/pkg3')}\n` +
                        `Package doesn't need fixing!`
                );
            });
        });
    });
});
