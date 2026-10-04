import React, {FC} from 'react';
import {UserType} from "../../api/apiTypes";
import {Form, Formik} from "formik";
import s from "./profile.module.sass";
import {TextInput} from "../../common/Form";
import {linkManager, unlinkManager} from "../../api/apiFunctions";
import {setUser} from "../../store/reducers/userSlice";
import {useAppDispatch} from "../../helpers/helpers";
import {getLinkManagerSchema} from "./LinkManagerValidationSchema";

export type LinkManagerFromType = {
    email: string;
}

const ProfileLinkForm: FC<{ user: UserType }> = ({user}) => {
    const dispatch = useAppDispatch();
    const {manager_id, user_type} = user;

    const unlinkManagerSubmit = async () => {
        unlinkManager().then(data => {
            if (data) dispatch(setUser(data));
        })
    }

    if (user_type === 'admin' || user_type === 'manager') return null;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                email: manager_id?.email || "",
            }}
            onSubmit={(values) => {
                linkManager(values.email).then(user => {
                    if (user) dispatch(setUser(user));
                })
            }}
            validationSchema={getLinkManagerSchema(user.email)}
        >
            {({values, errors, isValid, dirty}) => {
                const isEnabled = isValid && dirty && values.email !== user.manager_id?.email;
                return (
                    <div className={s.roomEdit}>
                        <h1>Link Manager</h1>
                        <Form className={s.block}>
                            <TextInput type={"email"} label={'Manager email'} name={'email'}/>
                            <button
                                type="submit"
                                className='button yellow'
                                disabled={!isEnabled}
                            >
                                Find and link
                            </button>
                            {
                                user.manager_id && <button
                                    type="button"
                                    className='button red'
                                    onClick={unlinkManagerSubmit}
                                >Unlink</button>
                            }
                        </Form>
                    </div>
                )
            }
            }
        </Formik>
    );
};

export default ProfileLinkForm;