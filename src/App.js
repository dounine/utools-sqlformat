import React from 'react';
import {Input, Button, Popconfirm, Radio, Icon, Spin} from 'antd';
import sqlFormatter from "sql-formatter";
import brace from 'brace';
import AceEditor from 'react-ace';
import './App.css';
import 'brace/mode/mysql';
import 'brace/theme/textmate';

const {TextArea} = Input;

class App extends React.Component {

    state = {
        value: '',
        format: '',
        tip: true,
        type: 'origin'
    };

    changeSql = (value) => {
        let self = this;
        if (self.state.type === 'origin') {
            self.setState({
                value
            })
        }
    };

    copy = ({}) => {

    };

    handleSizeChange = ({target: {value}}) => {
        this.setState({
            type: value,
            format: value === 'format' ? sqlFormatter.format(this.state.value) : ''
        })
    };

    confirm = ({target: {value}}) => {
        let tip = window.cache_put('tip', true);
        console.log('写入cache', tip);
        this.setState({
            tip: false
        });
    };

    componentDidMount() {
        let self = this;
        window.onPluginEnter = function ({code, type, payload}) {
            if (self.state.value !== payload) {
                self.setState({
                    value: payload,
                    type: 'format',
                    format: sqlFormatter.format(payload)
                })
            }
        };
        window.ready = function () {
            let tip = window.cache_get('tip');
            console.log('读取cache', tip);
            if (tip.data !== null) {
                self.setState({
                    tip: tip.data
                })
            }
        }
    }

    render() {
        const {value, format, type, tip} = this.state;
        return (
            <div className="App">
                <div>
                    <Radio.Group value={type} onChange={this.handleSizeChange}>
                        <Radio.Button value="origin">原始</Radio.Button>
                        {
                            tip && <Popconfirm
                                placement="bottomLeft"
                                title={"使用快捷键Command/Ctrl + Enter可快速切换."}
                                onConfirm={this.confirm}
                                okText="不再提示"
                                cancelText="取消"
                            >
                                <Radio.Button value="format">预览</Radio.Button>
                            </Popconfirm>
                        }
                        {
                            !tip && <Radio.Button value="format">预览</Radio.Button>
                        }
                    </Radio.Group>
                </div>
                <div style={{marginTop: 10}}>
                    <AceEditor
                        mode="mysql"
                        theme="textmate"
                        width={"100%"}
                        height={460}
                        scrollMargin={[10]}
                        className={"sqlinput"}
                        onChange={this.changeSql}
                        showGutter={false}
                        value={type === 'format' ? format : value}
                        fontSize={18}
                        focus={true}
                        highlightActiveLine={false}
                        commands={[{
                            name: 'formatter',
                            bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
                            exec: () => {
                                if (this.state.type === 'format') {
                                    this.handleSizeChange({target: {value: 'origin'}})
                                } else {
                                    this.handleSizeChange({target: {value: 'format'}})
                                }
                            }
                        }]}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: false,
                            tabSize: 2,
                        }}
                    />
                </div>
            </div>
        );
    }

}

export default App;
