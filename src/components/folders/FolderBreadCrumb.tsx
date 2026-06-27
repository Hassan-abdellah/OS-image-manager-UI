import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useMemo } from "react";
const FolderBreadCrumb = ({ folderPath }: { folderPath: string }) => {
  const pathToArray: string[] = useMemo(() => {
    return folderPath.split("/").map((item) => item.replaceAll("_", " "));
  }, [folderPath]);

  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>
        {pathToArray.map((item, index) => {
          const isLastItem = index === pathToArray.length - 1;
          return (
            <Fragment key={item}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href="/">{item}</BreadcrumbLink>
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
