import { toPascalCase } from "./pascalCase";
import { UseRouterPath } from "../../../hook/useRouterPath";

export const useBreadcrumbPath = () => {
    const route = UseRouterPath();
    const cleanRoute = route.replace(/\?/g, '/').replace(/=/g, '/'); 
    const pathToPascalCase = toPascalCase(cleanRoute); 
    return pathToPascalCase.split('/');
}
