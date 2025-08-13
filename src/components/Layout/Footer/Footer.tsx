import { Footer as FbFooter } from "flowbite-react"
const Footer = () => {
    return (
        <FbFooter container className=" bg-[#063942] text-white">
            <div className="flex justify-center w-full">
                <FbFooter.Copyright href="#" by="Y.M.A" year={2025} className="text-slate-200" />
            </div>
        </FbFooter>
    );
};
export default Footer;