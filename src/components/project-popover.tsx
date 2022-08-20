import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectPopover = () =>
  //props:
  // {setProjectModalOpen: (isOpen: boolean) => void}
  //{projectButton: JSX.Element}
  {
    const { data: projects } = useProjects();
    const pinnedProjects = projects?.filter((project) => project.pin);
    const dispatch = useDispatch();
    const content = (
      <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
          {pinnedProjects?.map((project) => (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          ))}
        </List>
        <Divider />
        {
          <ButtonNoPadding
            onClick={() => dispatch(projectListActions.openProjectModal())}
            type={"link"}
          >
            创建项目
          </ButtonNoPadding>
          /* <ButtonNoPadding onClick={() => props.setProjectModalOpen(true)} type={"link"}>
        创建项目
      </ButtonNoPadding> */
        }
        {/* {props.projectButton} */}
      </ContentContainer>
    );

    return (
      <Popover placement={"bottom"} content={content}>
        <span>项目</span>
      </Popover>
    );
  };

const ContentContainer = styled.div`
  min-width: 30rem;
`;
