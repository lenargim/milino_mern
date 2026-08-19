import {Formik} from 'formik';
import React, {FC} from 'react';
import s from './profile.module.sass'
import {EditProfileAPIType, EditProfileType, UserType} from "../../api/apiTypes";
import {updateProfile} from "../../api/apiFunctions";
import {setUser} from "../../store/reducers/userSlice";
import {prepareAdditionEmailsArrayToAPI, useAppDispatch} from "../../helpers/helpers";
import ProfileEditForm from "./ProfileEditForm";
import {ProfileEditSchema} from "./ProfileEditSchema";
import {useAuthUser} from "../../utils/customHooks";

const ProfileEdit: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAuthUser();
    const getInitialValues = (user: UserType): EditProfileType => {
        const {is_active, is_active_in_constructor, is_super_user, email, createdAt, has_archives, constructor_id, ...userData} = user
        return {...userData, password: '', compare: ''}
    }
    let initialValues = getInitialValues(user);

    if (!initialValues._id) return null;
    return (
        <Formik initialValues={initialValues}
                validationSchema={ProfileEditSchema}
                onSubmit={(values, {resetForm, setValues}) => {
                    const {compare, additional_emails, name, company, ...rest} = values;
                    const filtered_emails = prepareAdditionEmailsArrayToAPI(additional_emails)
                    const preparedValues: EditProfileAPIType = {
                        additional_emails: filtered_emails,
                        name: name.trim(),
                        company: company.trim(),
                        ...rest,
                    };

                    updateProfile(preparedValues).then(user => {
                        if (user) {
                            dispatch(setUser(user));
                            resetForm();
                            setValues({...user, password: '', compare: ''});
                        }
                    })
                }}>
            <div className={s.roomEdit}>
                <h1>Update Profile</h1>
                <ProfileEditForm user={user}/>
            </div>
        </Formik>
    );
};

export default ProfileEdit;