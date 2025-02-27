import { useState, useEffect } from "react";
import UserService from "../../services/user.service"; // ตรวจสอบให้แน่ใจว่าเส้นทางถูกต้อง

const Index = () => {
  const [users, setUsers] = useState([]);

  // ดึงข้อมูลผู้ใช้เมื่อ component โหลด
  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const response = await UserService.getAllUser();
    //     if (response.status === 200) {
    //       setUsers(response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };
    // fetchUsers();
    UserService.getAllUser().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const changeRole = (email) => {
    UserService.getRoleByEmail(email).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserService.makeUser(email).then(() => {
          setUsers(
            users.map((user) => {
              if (user.email === email) {
                user.role = "user";
              }
              return user;
            })
          );
        });
      } else {
        if (role === "admin") {
          UserService.makeAdmin(email).then(() => {
            setUsers(
              users.map((user) => {
                if (user.email === email) {
                  user.role = "admin";
                }
                return user;
              })
            );
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="text-gray-600">
              <th className="py-4 px-6 text-center">#</th>
              <th className="py-4 px-6 text-center">Email</th>
              <th className="py-4 px-6 text-center">Role</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="py-4 px-6 text-center">{user.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-sm text-gray-600">User</span>
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          onClick={changeRole}
                        />
                      </label>
                      <span className="text-sm text-gray-600">Admin</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="btn btn-ghost btn-sm text-blue-500 hover:bg-blue-100">
                      Edit
                    </button>
                    <button className="btn btn-ghost btn-sm text-red-500 hover:bg-red-100">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
