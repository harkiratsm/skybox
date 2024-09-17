import React from "react";

export type SettingHeaderProps = {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}


export const SettingHeader = ({
    title,
    subtitle,
    children
}:SettingHeaderProps) => {
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-sm md:mt-2 text-muted-foreground">{subtitle}</p>
                </div>
                {children}
            </div>

            <hr className="my-4"/>
        </>
    )
}