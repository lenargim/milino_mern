import React, {FC, useEffect} from "react";
import s from './profile.module.sass'
import {getSortClass} from "./ProfileAdmin";
import {setAdminUsers} from "../../store/reducers/adminSlice";
import ProfileTableRow from "./ProfileTableRow";
import {useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {AdminUsersRes} from "../../api/apiTypes";
import {getManagerDesigners} from "../../api/apiFunctions";

const ProfileManagerDesigners: FC = () => {
    const dispatch = useAppDispatch();
    const {users, sort, page, hasNextPage, totalUsersCount} = useAppSelector<AdminUsersRes>(state => state.admin.designers);
    const is_admin = false;
    useEffect(() => {
        // Get Designers for exact manager
        getManagerDesigners(sort, page).then(res => {
            if (res) dispatch(setAdminUsers(res));
        })
    }, [])
    if (!users.length) return <div><h1>No Designers Found</h1></div>;
    return (
        <div>
            <h1>Designers (Total: {totalUsersCount})</h1>
            <div className={s.table}>
                <div className={is_admin ? s.tableHead : s.tableHeadManager}>
                    <button type="button"
                            title="Sort by Date"
                            className={[s.tableHeadButton, s[getSortClass(sort,'createdAt')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.createdAt !== 1 ? 1 : -1;
                                getManagerDesigners({createdAt: sorting}, 1).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Date
                    </button>
                    <button type="button"
                            title="Sort by Company Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'company')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.company !== 1 ? 1 : -1;
                                getManagerDesigners({company: sorting}, 1).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Company
                    </button>
                    <button type="button"
                            title="Sort by Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'name')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.name !== 1 ? 1 : -1;
                                getManagerDesigners({name: sorting}, 1).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Name
                    </button>
                    <button type="button"
                            title="Sort by Email Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'email')]].join(' ')}
                            onClick={() => {
                                const sorting = sort.email !== 1 ? 1 : -1;
                                getManagerDesigners({email: sorting}, 1).then(res => {
                                    if (res) dispatch(setAdminUsers(res));
                                })
                            }}>Email
                    </button>
                    <div>Edit</div>
                </div>
                <div className={s.tableBody}>
                    {users.map(el => <ProfileTableRow row_user_type="designer" key={el._id} user={el}/>)}
                </div>
            </div>
            <div className={s.navigation}>
                {page > 1 && <button type="button" title="Prev Page" onClick={() => {
                    getManagerDesigners(sort, page - 1).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8249;</button>}

                {hasNextPage && <button type="button" title="Next Page" onClick={() => {
                    getManagerDesigners(sort, page + 1).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8250;</button>}
                {page > 1 && <div>Page: {page}</div>}
            </div>
        </div>
    );
};

export default ProfileManagerDesigners;

