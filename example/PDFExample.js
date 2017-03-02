/**
 * Created by Kevin on 16/3/9.
 */
'use strict';

import React,{
    Component,
    StyleSheet,
    View,
    Text
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';

const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';

export default class PDFExample extends Component {
    constructor(props) {
        super(props);
        this.state={
            isPdfDownload: false
        };
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
    }

    componentDidMount() {
        RNFS.downloadFile(pdfDownloadURL, this.pdfPath).then(res => {
            this.setState({isPdfDownload: true});
        }).catch(err => {
            console.log(err);
        });
    }

    zoom(val = 2.1){
        this.pdfView && setTimeout(()=>{
            this.pdfView.setNativeProps({zoom: val});
        }, 3000);
    }

    render(){
        if (!this.state.isPdfDownload){
            return (
                <View style={styles.container}>
                    <Text>Downloading</Text>
                </View>
            );
        }
        return (
            <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                     key="sop"
                     path={this.pdfPath}
                     onLoadComplete = {(pageCount)=>{
                        console.log(`total page count: ${pageCount}`);
                        this.zoom();
                     }}
                     style={styles.pdf}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pdf: {
        flex:1
    }
});