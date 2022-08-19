import {Table, TableProps} from "antd";
import {Pin} from "components/pin";
import dayjs from "dayjs";
import React from "react";
import {Link} from "react-router-dom";
import {useEditProject} from "utils/project";
import {User} from "./search-panel";


export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  refresh?: () => void,
}

// type PropsType = Omit<ListProps, 'users'>;

export const List = ({users, ...props}: ListProps) => {
  const {mutate} = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
          }
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (<Link to={String(project.id)}>{project.name}</Link>)
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    // dataSource={list}
    />
  );

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/* users.find 是 undefined 时用 ? 防止报错 */}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
