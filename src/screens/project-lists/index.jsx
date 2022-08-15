import {List} from "./list";
import {SearchPanel} from "./search-panel";
import {useEffect, useState} from "react";
import React from "react";
import {cleanObject} from "utils";
import qs from 'qs';
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  // param 改变时从接口获取数据
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    })
  }, []);
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div >;
}