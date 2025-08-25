// TODO: get environment variable working and use the utility function
// import ApiUrl from "../utilities/ApiUrl";
function ApiUrl() {
    return "https://lift.josephplaugher.com";
}
export default async function GetLiftOptions(): Promise<any> {
    const response: any = await fetch(`${ApiUrl()}/api/liftoption`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    return await response.json();
}