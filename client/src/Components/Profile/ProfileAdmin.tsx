import React, {FC, useEffect} from 'react';
import s from './profile.module.sass'
import {AdminUsersRes, AdminUsersType, UserType} from "../../api/apiTypes";
import {formatDateToTextShort, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {useNavigate} from "react-router-dom";
import {adminUserToggleEnabled, getAdminUsers} from "../../api/apiFunctions";
import {setAdminUserEnabled, setAdminUsers} from "../../store/reducers/adminSlice";
import EnabledSvg from "../../assets/img/EnabledSVG";
import DisabledSVG from "../../assets/img/DisabledSVG";


type SortTypes = 'createdAt' | 'name' | 'email' | 'company';
export type SortAdminUsers = Partial<{
    [key in SortTypes]: 1 | -1
}>;

const ProfileEdit: FC<{ user: UserType }> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const admin = useAppSelector<AdminUsersRes>(state => state.admin);
    const {users, sort, page, hasNextPage} = admin;

    useEffect(() => {
        if (!user.is_super_user) {
            navigate('/profile')
        }
        getAdminUsers(sort, page).then(res => {
            if (res) dispatch(setAdminUsers(res));
        })
    }, [])

    function getSortClass(sort:SortAdminUsers,type:SortTypes):string {
        switch (type) {
            case 'createdAt':
                if (sort.createdAt === 1) return 'asc';
                if (sort.createdAt === -1) return 'desc';
                break;
            case 'company':
                if (sort.company === 1) return 'asc';
                if (sort.company === -1) return 'desc';
                break;
            case 'name':
                if (sort.name === 1) return 'asc';
                if (sort.name === -1) return 'desc';
                break;
            case 'email':
                if (sort.email === 1) return 'asc';
                if (sort.email === -1) return 'desc';
        }
        return ''
    }
    return (
        <div className={s.roomsMain}>
            <h1>Enable Users</h1>
            <div className={s.table}>
                <div className={s.tableHead}>
                    <button type="button"
                            title="Sort by Date"
                            className={[s.tableHeadButton, s[getSortClass(sort,'createdAt')]].join(' ')}
                            onClick={() => {
                        const sorting = sort.createdAt !== 1 ? 1 : -1;
                        getAdminUsers({createdAt: sorting}, 1).then(res => {
                            if (res) dispatch(setAdminUsers(res));
                        })
                    }}>Date
                    </button>
                    <button type="button"
                            title="Sort by Company Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'company')]].join(' ')}
                            onClick={() => {
                        const sorting = sort.company !== 1 ? 1 : -1;
                        getAdminUsers({company: sorting}, 1).then(res => {
                            if (res) dispatch(setAdminUsers(res));
                        })
                    }}>Company
                    </button>
                    <button type="button"
                            title="Sort by Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'name')]].join(' ')}
                            onClick={() => {
                        const sorting = sort.name !== 1 ? 1 : -1;
                        getAdminUsers({name: sorting}, 1).then(res => {
                            if (res) dispatch(setAdminUsers(res));
                        })
                    }}>Name
                    </button>
                    <button type="button"
                            title="Sort by Email Name"
                            className={[s.tableHeadButton, s[getSortClass(sort,'email')]].join(' ')}
                            onClick={() => {
                        const sorting = sort.email !== 1 ? 1 : -1;
                        getAdminUsers({email: sorting}, 1).then(res => {
                            if (res) dispatch(setAdminUsers(res));
                        })
                    }}>Email
                    </button>
                    <div>Enabled</div>
                    <div>Constructor</div>
                </div>
                <div className={s.tableBody}>
                    {users.map(el => <ListItem key={el._id} user={el}/>)}
                </div>
            </div>
            <div className={s.navigation}>
                {page > 1 && <button type="button" title="Prev Page" onClick={() => {
                    getAdminUsers(sort, page - 1).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8249;</button>}

                {hasNextPage && <button type="button" title="Next Page" onClick={() => {
                    getAdminUsers(sort, page + 1).then(res => {
                        if (res) dispatch(setAdminUsers(res));
                    })
                }}>&#8250;</button>}
                {page > 1 && <div>Page: {page}</div>}
            </div>
        </div>
    );
};

export default ProfileEdit;

export type UserAccessData = { is_active: boolean, is_active_in_constructor: boolean };

const ListItem: FC<{ user: AdminUsersType }> = ({user}) => {
    const {is_active, email, name, _id, is_active_in_constructor, company, createdAt} = user
    const dispatch = useAppDispatch();
    const toggleUserEnabled = (data: UserAccessData) => {
        adminUserToggleEnabled(_id, data).then(res => {
            res && dispatch(setAdminUserEnabled(res))
        })
    }
    return (
        <div className={s.tableRow}>
            <div>{formatDateToTextShort(createdAt)}</div>
            <div>{company}</div>
            <div>{name}</div>
            <div>{email}</div>
            <div className="checkbox-wrap">
                <input className="checkbox" id={`is-active-${_id}`} name="is-active" type="checkbox" checked={is_active}
                       onChange={(e) => toggleUserEnabled({is_active: !is_active, is_active_in_constructor})}/>
                <label className="checkbox-label" htmlFor={`is-active-${_id}`}>
                    {is_active ? <EnabledSvg classes={s.svgEnabled}/> : <DisabledSVG classes={s.svgDisabled}/>}
                </label>
            </div>
            <div className="checkbox-wrap">
                <input className="checkbox" id={`is-active-in-constructor-${_id}`} name="is-active-in-constructor"
                       type="checkbox"
                       checked={is_active_in_constructor} onChange={(e) => toggleUserEnabled({
                    is_active,
                    is_active_in_constructor: !is_active_in_constructor
                })}/>
                <label className="checkbox-label" htmlFor={`is-active-in-constructor-${_id}`}>
                    {is_active_in_constructor ? <EnabledSvg classes={s.svgEnabled}/> :
                        <DisabledSVG classes={s.svgDisabled}/>}
                </label>
            </div>
        </div>
    )
}