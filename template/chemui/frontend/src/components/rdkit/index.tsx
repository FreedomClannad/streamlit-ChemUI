import {ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import {MoleculeStructure} from "chem-ui"
const MoleculeStructureComp = (props: ComponentProps) => {
    const {args} = props
    const {smiles, staticResourcesUrl = ""} = args
    return <MoleculeStructure
        id="molecule1"
        structure={smiles}
        options={{
            locateFile: (file) => {
                return `${staticResourcesUrl}/${file}`;
            }
        }}
    ></MoleculeStructure>
}
const ChemUiMoleculeStructure = withStreamlitConnection(MoleculeStructureComp)
export {ChemUiMoleculeStructure}
