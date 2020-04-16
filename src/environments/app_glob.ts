import { environment } from "./environment";

export const appGlob = {
    User: {
        UserDetailsGet: () => {
            return {
                userid: localStorage.getItem('userid'),
                username: localStorage.getItem('username'),
                firstname: localStorage.getItem('firstname'),
                surname: localStorage.getItem('surname'),
                lastname: localStorage.getItem("lastname"),
                isLogin: localStorage.getItem('isLogin'),
                AppFor: localStorage.getItem('AppFor'),
                TenantId: localStorage.getItem('tenantid')
            }
        },
        UserDetailsClear: () => {
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
            localStorage.removeItem('firstname');
            localStorage.removeItem('surname');
            localStorage.removeItem("lastname");
            localStorage.removeItem('isLogin');
            localStorage.removeItem('AppFor');
        },
        UserDetailsSet: (user) => {
            localStorage.setItem('userid', user.UserId);
            localStorage.setItem('username', user.Username);
            localStorage.setItem('firstname', user.Firstname);
            localStorage.setItem('surname', user.Surname);
            localStorage.setItem("lastname", user.Lastname);
            localStorage.setItem('isLogin', "Y");
            localStorage.setItem('AppFor', environment.AppFor);   //Client, Customer
        },
        isClient() {
            return environment.AppFor == "Client";
        },
        isCustomer() {
            return environment.AppFor == "Customer";
        }
    }
}