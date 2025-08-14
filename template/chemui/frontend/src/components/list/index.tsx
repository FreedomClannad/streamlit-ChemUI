import {
    withStreamlitConnection,
    ComponentProps,
} from "streamlit-component-lib"
import {defaultDownloadTools, List, useListHook} from "chem-ui";
import type {ChemUIListItemType, ChemUITextItemType, ChemUIModuleItemType} from "chem-ui"
import {useEffect, useState} from "react";
const ListComp = (props: ComponentProps) => {
    const {args} = props
    const {data, staticResourcesUrl = ""} = args
    const [moduleItemList, setModuleItemList] = useState<ChemUIModuleItemType[]>(
        [],
    );
    const defaultItemTool = defaultDownloadTools<ChemUIListItemType>();
    const defaultModuleTool = defaultDownloadTools<ChemUIModuleItemType>();
    const defaultTextTool = defaultDownloadTools<ChemUITextItemType>();
    const { renderComponents, validateObjectList } = useListHook();
    useEffect(() => {
        setModuleItemList(validateObjectList(data))
    }, [data])
    return (
        <div style={{ height: "1000px", width: "100%"}}>
            <List
                dataSource={moduleItemList}
                toolsData={{
                moduleTools: defaultModuleTool,
                itemTools: defaultItemTool,
                textItemTools: defaultTextTool,
                }}
                renderComponents={renderComponents}
                config={{
                    csv: {
                        smilesOptions: {
                            locateFile: (file: string) => {
                                return `${staticResourcesUrl}/${file}`;
                            },
                        },
                    },
                }}
            />
        </div>
    )
}
const ChemList = withStreamlitConnection(ListComp)
export {ChemList}
