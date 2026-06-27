import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { folderChain } from "@/types/apiDataTypes";
import { Fragment, useMemo } from "react";
import { Link } from "react-router";
const FolderBreadCrumb = ({ pathChain }: { pathChain: folderChain[] }) => {
  // modify the names
  const pathToArray: folderChain[] = useMemo(() => {
    return pathChain.map((item) => ({
      ...item,
      name: item.name.replaceAll("_", " "),
    }));
  }, [pathChain]);

  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>
        {pathToArray.map((item, index) => {
          const isLastItem = index === pathToArray.length - 1;
          const isFirstItem = index === 0;
          return (
            <Fragment key={item.id}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={isFirstItem ? "/" : `/folders/${item.id}`}>
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLastItem && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default FolderBreadCrumb;
