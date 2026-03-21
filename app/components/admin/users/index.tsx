import { useEffect, useMemo, useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { getUsers } from "../../../services/user";
import type { User } from "../../../type/user";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import DeleteModal from "../modal/DeleteModal";
import UserDetail from "./UserDetail";
import UserModal from "../modal/UserModal";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setIsLoading(true);

        const userData = await getUsers();

        if (!mounted) {
          return;
        }

        setUsers(userData);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((item) => {
      const inName = (item.fullName ?? "").toLowerCase().includes(query);
      const inEmail = (item.email ?? "").toLowerCase().includes(query);
      const inPhone = (item.phoneNumber ?? "").toLowerCase().includes(query);
      const inAddress = (item.address ?? "").toLowerCase().includes(query);

      return inName || inEmail || inPhone || inAddress;
    });
  }, [users, keyword]);

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const openUserDetail = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const openEditModal = (user: User) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <section className="space-y-5">
      <div className="space-y-4 border border-pink-100 bg-white p-4 shadow-[0_8px_24px_rgba(236,72,153,0.05)] sm:p-5">
        <CardHeader className="space-y-4 p-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 space-y-1.5">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Quản lý người dùng
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-slate-600">
                Quản lý thông tin tài khoản và liên hệ của người dùng.
              </CardDescription>
            </div>

            <Button
              className="h-10 shrink-0 bg-pink-500 px-4 text-white shadow-none hover:bg-pink-600"
              size="sm"
              onClick={() => setIsUserModalOpen(true)}
            >
              <Plus className="size-4" />
              Thêm người dùng
            </Button>
          </div>

          <div className="group relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-pink-500" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo tên, email, số điện thoại hoặc địa chỉ..."
              className="h-11 border-slate-200 bg-white pl-9 text-slate-700 placeholder:text-slate-400 focus-visible:border-pink-400 focus-visible:ring-pink-200"
            />
          </div>
        </CardHeader>
      </div>

      <div className="border border-pink-100 bg-white shadow-[0_10px_28px_rgba(236,72,153,0.04)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-260 table-fixed text-sm">
              <thead>
                <tr className="bg-pink-50/60 text-left text-slate-500">
                  <th
                    style={{ width: "28%" }}
                    className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Người dùng
                  </th>
                  <th
                    style={{ width: "24%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Email
                  </th>
                  <th
                    style={{ width: "16%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Số điện thoại
                  </th>
                  <th
                    style={{ width: "22%" }}
                    className="px-3.5 py-3.5 text-xs font-semibold uppercase tracking-wide"
                  >
                    Địa chỉ
                  </th>
                  <th
                    style={{ width: "10%" }}
                    className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {isLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Đang tải dữ liệu người dùng...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredUsers.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-pink-50 transition-colors duration-200 last:border-b-0 hover:bg-pink-50/30"
                      >
                        <td className="px-4 py-3.5 align-middle">
                          <button
                            type="button"
                            onClick={() => openUserDetail(item)}
                            className="flex w-full items-center gap-2.5 text-left"
                          >
                            <img
                              src={item.avatarUrl}
                              alt={item.fullName}
                              className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                            <div className="min-w-0 overflow-hidden">
                              <p
                                title={item.fullName}
                                className="truncate font-medium text-slate-900 transition-colors duration-200 hover:text-pink-600"
                              >
                                {item.fullName}
                              </p>
                            </div>
                          </button>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle">
                          <span
                            title={item.email}
                            className="block truncate text-sm text-slate-600"
                          >
                            {item.email}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle">
                          <span className="block truncate text-sm text-slate-600">
                            {item.phoneNumber || "-"}
                          </span>
                        </td>

                        <td className="px-3.5 py-3.5 align-middle">
                          <span
                            title={item.address}
                            className="block truncate text-sm text-slate-600"
                          >
                            {item.address || "-"}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-right align-middle">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Chỉnh sửa người dùng"
                              onClick={() => openEditModal(item)}
                              className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              type="button"
                              title="Xóa người dùng"
                              onClick={() => openDeleteModal(item)}
                              className="inline-flex items-center gap-2 rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                {!isLoading && filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Không tìm thấy người dùng phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        title="Xóa người dùng"
        description="Tài khoản này sẽ bị gỡ khỏi danh sách người dùng."
        confirmText="Xóa người dùng"
        onClose={closeDeleteModal}
        onConfirm={() => {}}
      />

      <UserDetail
        open={isUserDetailOpen}
        user={selectedUser}
        onClose={() => { setIsUserDetailOpen(false); setSelectedUser(null); }}
      />

      <UserModal
        open={isUserModalOpen}
        mode="create"
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={() => {}}
      />

      <UserModal
        open={isEditModalOpen}
        mode="edit"
        initialValues={
          userToEdit
            ? {
                fullName: userToEdit.fullName,
                email: userToEdit.email,
                phoneNumber: userToEdit.phoneNumber,
                address: userToEdit.address ?? "",
                avatarUrl: userToEdit.avatarUrl ?? "",
              }
            : undefined
        }
        onClose={() => { setIsEditModalOpen(false); setUserToEdit(null); }}
        onSubmit={() => {}}
      />
    </section>
  );
}
