import React, {FC, useEffect} from 'react';
import s from "./profile.module.sass";
import {getAdminUsers} from "../../api/apiFunctions";
import {setAdminUsers} from "../../store/reducers/adminSlice";
import ProfileTableRow from "./ProfileTableRow";
import {getSortClass} from "./ProfileAdmin";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {AdminUsersRes} from "../../api/apiTypes";

const ProfileDesigners: FC = () => {
    const dispatch = useAppDispatch();

    const {
        users,
        sort,
        page,
        hasNextPage,
        totalUsersCount
    } = useAppSelector<AdminUsersRes>(state => state.admin.designers);
    const user_type = 'designer'

    useEffect(() => {
        // Get Designers
        getAdminUsers(sort, page, user_type).then(res => {
            if (res) dispatch(setAdminUsers(res));
        })
    }, [])

    if (!users.length) return <div><h1>No Designers</h1></div>
    return (
        <div>
            <h1>Designers (Total: {totalUsersCount})</h1>
            <div className={s.table}>
                <div className={s.tableHead}>
                    <button type="button"
                            title="Sort by Date"
                            className={[s.tableHeadButton, s[getSortClass(sort, 'createdAt')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.createdAt !== 1 ? 1 : -1;
                                getAdminUsers({createdAt: sorting}, 1, user_type).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Date
                    </button>
                    <button type="button"
                            title="Sort by Company Name"
                            className={[s.tableHeadButton, s[getSortClass(sort, 'company')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.company !== 1 ? 1 : -1;
                                getAdminUsers({company: sorting}, 1, user_type).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Company
                    </button>
                    <button type="button"
                            title="Sort by Name"
                            className={[s.tableHeadButton, s[getSortClass(sort, 'name')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.name !== 1 ? 1 : -1;
                                getAdminUsers({name: sorting}, 1, user_type).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Name
                    </button>
                    <button type="button"
                            title="Sort by Email Name"
                            className={[s.tableHeadButton, s[getSortClass(sort, 'email')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.email !== 1 ? 1 : -1;
                                getAdminUsers({email: sorting}, 1, user_type).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Email
                    </button>
                    <div>Enabled</div>
                    <div>Constructor</div>
                    <div>Grant</div>
                    <div>Edit</div>
                </div>
                <div className={s.tableBody}>
                    {users.map(el => <ProfileTableRow row_user_type={user_type} key={el._id} user={el}/>)}
                </div>
            </div>
            <div className={s.navigation}>
                {page > 1 && <button type="button" title="Prev Page" onClick={() => {
                    getAdminUsers(sort, page - 1, user_type).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8249;</button>}

                {hasNextPage && <button type="button" title="Next Page" onClick={() => {
                    getAdminUsers(sort, page + 1, user_type).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8250;</button>}
                {page > 1 && <div>Page: {page}</div>}
            </div>
        </div>
    );
};

export default ProfileDesigners;