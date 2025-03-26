import React, { useEffect, useState } from "react";
import { Card } from "../components/common/Card";
import { Pagination } from "../components/common/Pagination";
import { getWorkspaces } from "../services/workSpaceService";

export const Workspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const fetchWorkspaces = async (page) => {
    try {
      const response = await getWorkspaces(page);
      const workspacesData = response.data;
      const paginationData = response.pagination;
      setWorkspaces(workspacesData);
      setPagination(paginationData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchWorkspaces(page);
  }, [page]);

  return (
    <div className="flex w-full justify-center">
      <section className="flex flex-col w-full  items-center mt-10">
        <div className="flex flex-col gap-2 w-[50%]">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              title={workspace.name}
              description={workspace.location}
              path={`/workspace/${workspace.id}`}
            />
          ))}
        </div>
        {pagination && (
          <div className="w-[50%]">
            <Pagination
              currentPage={pagination?.current_page || 1}
              totalPages={pagination?.last_page || 1}
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  );
};
