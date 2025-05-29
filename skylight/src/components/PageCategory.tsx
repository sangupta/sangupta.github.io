import { FunctionComponent } from "preact";
import { SitePage } from "../types";

interface PageCategoryProps {
    page: SitePage;
}
const PageCategory: FunctionComponent<PageCategoryProps> = ({ page }) => {
    if (page && page.category) {
        return <>
            <span className='page-category'>
                Published in {page.category}
            </span>
            <span className='spacer'>⏺</span>
        </>
    }

    return null;
}

export default PageCategory;
