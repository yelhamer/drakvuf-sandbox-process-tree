import React, { useState } from "react";
import Button from "@mui/material/Button";
import ProcessTree from "./Tree.js";
import ReactDOM from "react-dom";
import LabTabs from "./SideBar.js";
import "./index.css";

var report = require("./report.json");
var files = [
  {"Plugin": "filetracer", "TimeStamp": "1711231505.013566", "PID": 0, "PPID": 0, "TID": 1704, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x1977", "FileName": "\\DEVICE\\NETBT_TCPIP_{CDD951D5-9C37-4D28-94D5-A6952F217464}", "FileHandle": "0x5ec", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "SUCCESS"},
{"Plugin": "filetracer", "TimeStamp": "1711231505.014043", "PID": 0, "PPID": 4, "TID": 1704, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x197d", "FileName": "\\DEVICE\\NETBT_TCPIP_{0B05E9AF-E95C-11EE-A0B5-806E6F6E6963}", "FileHandle": "0x5ec", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "FAIL"},
{"Plugin": "filetracer", "TimeStamp": "1711231505.068884", "PID": 0, "PPID": 0, "TID": 1704, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x1cd9", "FileName": "\\DEVICE\\NETBT_TCPIP_{CDD951D5-9C37-4D28-94D5-A6952F217464}", "FileHandle": "0x13fc", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "SUCCESS"},
{"Plugin": "filetracer", "TimeStamp": "1711231505.069384", "PID": 0, "PPID": 0, "TID": 1704, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x1ce1", "FileName": "\\DEVICE\\NETBT_TCPIP_{0B05E9AF-E95C-11EE-A0B5-806E6F6E6963}", "FileHandle": "0x13fc", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "FAIL"},
{"Plugin": "filetracer", "TimeStamp": "1711231506.110005", "PID": 0, "PPID": 4, "TID": 2304, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x25bc", "FileName": "\\DEVICE\\NETBT_TCPIP_{CDD951D5-9C37-4D28-94D5-A6952F217464}", "FileHandle": "0x728", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "SUCCESS"},
{"Plugin": "filetracer", "TimeStamp": "1711231506.110544", "PID": 0, "PPID": 4, "TID": 2304, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtCreateFile", "EventUID": "0x25c2", "FileName": "\\DEVICE\\NETBT_TCPIP_{0B05E9AF-E95C-11EE-A0B5-806E6F6E6963}", "FileHandle": "0x728", "ObjectAttributes": "OBJ_CASE_INSENSITIVE", "DesiredAccess": "FILE_READ_DATA | SYNCHRONIZE", "FileAttributes": "FILE_ATTRIBUTE_NORMAL", "ShareAccess": "FILE_SHARE_READ | FILE_SHARE_WRITE", "CreateDisposition": "FILE_OPEN", "CreateOptions": "(null)", "Status": "FAIL"},
{"Plugin": "filetracer", "TimeStamp": "1711231506.461817", "PID": 0, "PPID": 4, "TID": 2860, "UserName": "SessionID", "UserId": 2, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\explorer.exe", "Method": "NtOpenFile", "EventUID": "0x26eb", "FileName": "\\??\\C:\\", "ObjectAttributes": "OBJ_CASE_INSENSITIVE"},
]
var filesPerProcess = sortByProcess(files, "FileName");
var regkeys = [
  {"Plugin": "regmon", "TimeStamp": "1711231506.518912", "PID": 0, "PPID": 4, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtEnumerateKey", "EventUID": "0x2a08", "Key": "\\REGISTRY\\MACHINE\\SYSTEM\\SYSTEM\\CONTROLSET001\\SERVICES\\WCIFS\\INSTANCES", "ValueName": null, "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.519373", "PID": 0, "PPID": 4, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtOpenKey", "EventUID": "0x2a13", "Key": "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\storqosflt\\INSTANCES", "ValueName": null, "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.519682", "PID": 0, "PPID": 0, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtEnumerateKey", "EventUID": "0x2a19", "Key": "\\DEVICE\\NETBT_TCPIP_{0B05E9AF-E95C-11EE-A0B5-806E6F6E612321321321321321312312312312312312312312312312963}", "ValueName": null, "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.520024", "PID": 0, "PPID": 0, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtOpenKey", "EventUID": "0x2a20", "Key": "\\REGISTRY\\MACHINE\\SYSTEM\\SYSTEM\\CONTROLSET001\\SERVICES\\STORQOSFLT\\INSTANCES\\storqosflt", "ValueName": null, "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.520281", "PID": 0, "PPID": 0, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtQueryValueKey", "EventUID": "0x2a26", "Key": "\\REGISTRY\\MACHINE\\SYSTEM\\SYSTEM\\CONTROLSET001\\SERVICES\\STORQOSFLT\\INSTANCES\\STORQOSFLT", "ValueName": "FLAGS", "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.520529", "PID": 0, "PPID": 4, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtQueryValueKey", "EventUID": "0x2a2a", "Key": "\\REGISTRY\\MACHINE\\SYSTEM\\SYSTEM\\CONTROLSET001\\SERVICES\\STORQOSFLT\\INSTANCES\\STORQOSFLT", "ValueName": "ALTITUDE", "Value": null},
{"Plugin": "regmon", "TimeStamp": "1711231506.521017", "PID": 0, "PPID": 4, "TID": 1160, "UserName": "SessionID", "UserId": 0, "ProcessName": "\\Device\\HarddiskVolume2\\Windows\\System32\\svchost.exe", "Method": "NtEnumerateKey", "EventUID": "0x2a36", "Key": "\\REGISTRY\\MACHINE\\SYSTEM\\SYSTEM\\CONTROLSET001\\SERVICES\\STORQOSFLT\\INSTANCES", "ValueName": null, "Value": null}

]
var regkeyPerProcess = sortByProcess(regkeys, "Key");
addToReport(report, filesPerProcess, "files");
addToReport(report, regkeyPerProcess, "registry_keys");
function JSONL2Dict(filepath) {
  try {
    var reader = new FileReader(filepath);
    let stringBuffer = ''

    reader.addEventListener('load', function (e) {
      stringBuffer = e.target.result;

    });
    reader.readAsText(new File([""], filepath));
    var lines = stringBuffer.split(/\n/);
    var wrapped = "[" + lines.join(",") + "]";
    return JSON.parse(wrapped);
  } catch (error) {
    return [];
  }
}


function sortByProcess(jsonLinesDict, key) {
  let sortedDict = {};
  let pKey = '';
  for(let entry of jsonLinesDict) {
    pKey = entry["PID"] + "_" + entry["PPID"]
    if (!(pKey in sortedDict)) {
      sortedDict[pKey] = new Set();
    }
    sortedDict[pKey].add(entry[key])
  }
  return sortedDict;
}

function addToReport(report, dict, key){
  for (let k of Object.keys(report["processes"])) {
    report["processes"][k][key] = [];
  }
  for (let processKey of Object.keys(dict)) {
    report["processes"][processKey][key] = [...dict[processKey]];
  }
}


function App() {
  const [process, setProcess] = useState(false);
  const [ttp, setTtp] = useState(false);
  const [file, setFile] = useState(false);
  const [registry, setRegistry] = useState(false);
  const clearAllFilters = () => {
    setProcess(false);
    setTtp(false);
    setFile(false);
    setRegistry(false);
  };

  return (
    <>
      <ProcessTree
        report={report}
        selectedTTP={ttp}
        selectedFile={file}
        selectedRegistry={registry}
        onSelectProcess={(process_id) => setProcess(process_id)}
      />
      <div className="rowC">
        <LabTabs
          report={report}
          selectedProcess={process}
          onSelectTTP={(ttp_name) => {
            clearAllFilters();
            setTtp(ttp_name);
          }}
          onSelectFile={(filename) => {
            clearAllFilters();
            setFile(filename);
          }}
          onSelectRegistry={(regkey) => {
            clearAllFilters();
            setRegistry(regkey);
          }}
        />
      </div>
      <Button
        onClick={() => clearAllFilters()}
        style={{
          position: "absolute",
          left: 13,
          bottom: 13,
          fontSize: 15,
          maxWidth: "100px",
        }}
        variant="contained"
      >
        Clear Selections
      </Button>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
