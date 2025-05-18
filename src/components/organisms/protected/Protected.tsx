import { IComponentWithChildren } from "@/app";
import { PAGES_ROUTES } from "@/globals";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export interface ProtectedProps extends IComponentWithChildren {
    errorRedirect?: string;
}

const Protected: React.FC<ProtectedProps> = ({
    children,
    errorRedirect = PAGES_ROUTES.AUTH.LOGIN,
}) => {
    const { fetchUserData, user, isUserDataLoading, userWasFetched } = useUserStore();
    useEffect(() => {
        if (!user && isUserDataLoading && !userWasFetched) {
            fetchUserData();
        };
    }, [user, isUserDataLoading, userWasFetched]);

    useEffect(() => {
        if(!user && userWasFetched && errorRedirect) {
            window.location.href = errorRedirect;
        };
    }, [userWasFetched, user]);

    useEffect(() => {
        if(!user && !isUserDataLoading && errorRedirect) {
            window.location.href = errorRedirect;
        };
    }, [user, isUserDataLoading]);

    if (!user) return <></>;
    return <>
        {children}
    </>
}

export default Protected;