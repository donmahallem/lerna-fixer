import { SinonSpy, SinonSpyCall } from "sinon";
type LogSignature = SinonSpy<Parameters<typeof console.log>, ReturnType<typeof console.log>>;
type GroupSignature = SinonSpy<Parameters<typeof console.group>, ReturnType<typeof console.group>>;
type SpySignature = GroupSignature | LogSignature;
export function joinLog(...stubs: SpySignature[]): string {
    const spyCalls: SinonSpyCall[][] = stubs
        .map((spy: SpySignature): SinonSpyCall[] => spy.getCalls());
    const spies: SinonSpyCall[] = ([] as SinonSpyCall[]).concat(...spyCalls);
    return spies
        .sort((a: SinonSpyCall, b: SinonSpyCall): number => {
            return a.calledAfter(b) ? 1 :
                a.calledBefore(b) ? -1 : 0;
        })
        .map((call: SinonSpyCall): string => {
            call.calledOn
            return (call.args as string[]).join(' ');
        })
        .join('\n');
}
