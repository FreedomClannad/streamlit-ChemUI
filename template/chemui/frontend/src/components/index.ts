import {ChemList} from "./list";
import {ChemUiMoleculeStructure} from "./rdkit";

export const ComponentMap: Record<string, React.ComponentType<any>> = {
    List: ChemList,
    MoleculeStructure: ChemUiMoleculeStructure,
}