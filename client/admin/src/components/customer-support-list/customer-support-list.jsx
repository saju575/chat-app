import { useQuery } from "react-query";
import { getDataRequest } from "../../utils/server-request-function/get-data-request";
import CustomerSupportRow from "./customer-support-row";

const CustomerSupportList = () => {
  const { data: customerSupports, isLoading } = useQuery({
    queryKey: ["customerSupports"],
    queryFn: () => getDataRequest("/customer-support/all"),
  });

  return (
    <div className="relative overflow-x-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isLoading && customerSupports?.payload?.length > 0 && (
          <table id="example" className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">UserName</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {customerSupports?.payload?.map((customerSupport, index) => {
                return <CustomerSupportRow key={index} row={customerSupport} />;
              })}
            </tbody>
          </table>
        )}

        {!isLoading && customerSupports?.payload?.length === 0 && (
          <div className="flex justify-center items-center h-screen">
            No Data
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportList;
