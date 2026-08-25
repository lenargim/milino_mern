import {Form, Formik} from 'formik';
import React, {FC} from 'react';
import s from './profile.module.sass';
import {AdditionalEmailsArray, PasswordInput, PhoneInput, TextInput} from "../../common/Form";
import {EditProfileAPIType, EditProfileType, UserType} from "../../api/apiTypes";
import {ProfileEditSchema} from "./ProfileEditSchema";
import {prepareAdditionEmailsArrayToAPI, useAppDispatch} from "../../helpers/helpers";
import {updateProfile} from "../../api/apiFunctions";
import {setUser} from "../../store/reducers/userSlice";

const getInitialValues = (user: UserType): EditProfileType => {
    const { is_active, is_active_in_constructor, user_type, email, createdAt, has_archives, constructor_id, ...userData } = user;
    return { ...userData, password: '', compare: '' };
};

const ProfileEditForm: FC<{ user: UserType }> = ({ user }) => {
    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={getInitialValues(user)}
            validationSchema={ProfileEditSchema}
            onSubmit={(values, { resetForm, setValues }) => {
                const { compare, additional_emails, name, company, ...rest } = values;
                const filtered_emails = prepareAdditionEmailsArrayToAPI(additional_emails);
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
                        setValues({ ...user, password: '', compare: '' });
                    }
                });
            }}
        >
            {({ values, errors, isValid, dirty }) => {
                const {additional_emails} = values
                const isEnabled = dirty && isValid;
                return (
                    <div className={s.roomEdit}>
                        <h1>Update Profile</h1>
                        <Form className={s.block}>
                            <TextInput type={"text"} label={'Name'} name={'name'}/>
                            <TextInput type={"text"} label={'Company'} name={'company'}/>
                            <PhoneInput type="text" label="Phone number" name={'phone'}/>
                            <TextInput type={"text"} label={'Website'} name={'website'}/>
                            <AdditionalEmailsArray additional_emails={additional_emails} errors={errors.additional_emails}
                            />
                            <PasswordInput type={"password"} label={'Password'} name={'password'}/>
                            <PasswordInput type={"password"} label={'Confirm password'} name={'compare'}/>

                            <button
                                type="submit"
                                className='button yellow'
                                disabled={!isEnabled}
                            >
                                Update
                            </button>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default ProfileEditForm;

