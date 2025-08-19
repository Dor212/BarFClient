import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
    return (
        <FbFooter container className="bg-[#063942] text-white">
            <div className="flex flex-col items-center w-full gap-3">
               
                <FbFooter.Copyright
                    href="#"
                    by="Y.M.A"
                    year={2025}
                    className="text-slate-200"
                />

                <FbFooter.LinkGroup className="justify-center">
                    <FbFooter.Link
                        href="/accessibility"
                        className="text-slate-200 hover:underline"
                    >
                        הצהרת נגישות ומדיניות פרטיות
                    </FbFooter.Link>
                </FbFooter.LinkGroup>
            </div>
        </FbFooter>
    );
};

export default Footer;
