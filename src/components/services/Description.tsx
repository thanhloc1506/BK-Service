import React from "react";

interface IDescription {
    description: string;
}

const Description: React.FC<IDescription> = ({ description }: IDescription) => {
    return (
        <div className="flex justify-start pl-32 pt-6">
            <p className="font-light text-lg" dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    );
};

export default Description;
