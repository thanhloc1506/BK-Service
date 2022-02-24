import React, {Children, createContext, ReactElement} from 'react';

export interface SideBarElement {
    readonly children?: ReactElement;
    readonly icon?: any;
    readonly title?: string;
    readonly onClick?: () => void;
    readonly index?: number
}

const SideBarContex: any = createContext({
    curIndex: 0,
    eleSize: 0,
    addNewEle: () => {
    }
});
export default class SideBar extends React.Component {
    private childrenElement: Element[];

    constructor(props: any) {
        super(props);
        var count = -1;
        this.childrenElement = Children.map<Element, any>(this.props.children, (child: any, index: number): any => {
            if (child.type == SideBar.Element) {
                count++;
                return React.cloneElement<any, Element>(child, {index: count});
            }
        })
        this.state = {
            curIndex: 0,
            eleSize: this.childrenElement.length,
            setCurIndex: (index: number) => {
                this.setState(state => ({
                    curIndex: index
                }))
            }
        }
    }

    static Element: React.FC<SideBarElement> = (props) => {
        return (
            <SideBarContex.Consumer>
                {({curIndex, eleSize, setCurIndex}: any) => {
                    const __onClick = () => {
                        setCurIndex(props.index)
                        props.onClick && props.onClick();
                    }
                    const bar = <div
                        className={"ease-out duration-1000 w-1 h-full bg-blue-500 absolute" }
                        style={{float: "left", zIndex: 100}}>

                    </div>;
                    return <div onClick={__onClick} className={"relative overflow-hidden"}>
                        {curIndex == props.index ? bar: null}
                        <div
                            className={"ease-out duration-500 " + (curIndex == props.index ? "opacity-100 bg-blue-200" : "opacity-50")}>
                            {props.children}
                        </div>
                    </div>
                }}
            </SideBarContex.Consumer>
        )
    }

    render() {
        return (<SideBarContex.Provider value={this.state}>
            {this.childrenElement}
        </SideBarContex.Provider>);
    }

}