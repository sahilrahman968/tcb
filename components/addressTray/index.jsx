import React, { useEffect, useState } from 'react'
import styles from "../../styles/AddressTray.module.scss"
import BottomTray from '../bottomTray'
import Image from 'next/image';
import address from "../../assets/address.svg"
import SearchInputV2 from "../../components/SearchInputV2/SearchInputV2"
import location from "../../assets/location.png"
import { addNewAddress, getUserAddresses } from '../../apiConsumers/address';
import { useUserContext } from '../../providers/UserContextProvider';
import CircularLoader from '../circularLoader';
import { Skeleton } from 'antd';
import { toast } from 'react-toastify';
import { showFailToast, showSuccessToast } from '../../heperFunctions';
const AddressTray = ({ setDeliveryAddress, closeTray }) => {
    const { userData } = useUserContext()
    const [postLoading,setPostLoading] = useState(false)
    const [getLoading,setGetLoading] = useState(false)
    const [savedAddress, setSavedAddress] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formState, setFormState] = useState({
        nick_name: "",
        line_1: "", //house/flat/block
        line_2: "", //appartment/road/area
        line_3: "", //landmark
        mob: ""
    })

    useEffect(()=>{
        fetchAddress();
    },[])
    console.log("formState", formState)
    const formSetter = (key, value) => {
        let clone = { ...formState };
        clone[key] = value;
        setFormState(clone);
    }

    const disableSubmit = () => {
        if (!formState?.nick_name) {
            return "ADD ADDRESS NICKNAME"
        }
        if (!formState?.line_1) {
            return "ADD HOUSE / FLAT / BLOCK NO."
        }
        else if (!formState?.line_2) {
            return "ADD APPARTMENT / ROAD / AREA"
        }
        else if (!formState?.line_3) {
            return "ADD LANDMARK"
        }
        else if (!formState?.mob) {
            return "ADD MOBILE NO."
        }
        else if (formState?.mob?.length !== 10) {
            return "INVALID MOBILE NO."
        }
        return false;
    }

    const fetchAddress = async () => {
        try{
            setGetLoading(true)
            let response = await getUserAddresses(userData?._id)
            if(Array.isArray(response)){
                setSavedAddress(response)
            }
            else{
                setSavedAddress([])
            }
            setGetLoading(false)
        }
        catch(err){
            setGetLoading(false)
        }
    }
    const submitHandler = async () => {
        try{
            setPostLoading(true);
            let response = await addNewAddress({user_id:userData?._id,...formState});
            setPostLoading(false);
            showSuccessToast("Address added!")
            setShowAddressForm(false);
            await fetchAddress()
        }
        catch(err){
            showFailToast("Something went wrong! Please try again later.")
            setPostLoading(false);
        }
    }

    const selectDeliveryAddress = (address) => {
        if (address?.nick_name)
            setDeliveryAddress(address)
        else
            setDeliveryAddress(null)
        closeTray()
    }
    return (
        <BottomTray bg={true} close={true} closeHandler={()=>{closeTray()}}>
            <div className={styles.address_tray_container}>
                {
                    !showAddressForm &&
                    <>
                        {   
                            getLoading ? <Skeleton/> :
                            savedAddress?.length ? <div className={styles.saved_address_container}>
                                <div className={styles.container_heading}>Choose a delivery address</div>
                                <div className={styles.address_list}>
                                    {
                                        savedAddress?.map((item, index) => {
                                            return <div key={index} className={styles.list_item} onClick={() => { selectDeliveryAddress(item) }}>
                                                <div className={styles.image_container}>
                                                    <Image src={location} height={30} />
                                                </div>
                                                <div className={styles.address_info}>
                                                    <div className={styles.nickname}>{item?.nick_name}</div>
                                                    <div className={styles.address_line}>{item?.line_1}</div>
                                                    <div className={styles.address_line}>{item?.line_2}</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div> :
                                <div className={styles.address_image_container}>
                                    <Image src={address} />
                                </div>
                        }
                        <div className={styles.add_delivery_location} onClick={() => { setShowAddressForm(true) }}>
                            Add New Address
                        </div>
                    </>
                }
                {
                    showAddressForm && <div className={styles.address_form_container}>
                        <div className={styles.notice_container}>
                            A detailed address will help our Delivery Partner reach your doorstep easily
                        </div>
                        <div className={styles.form_container}>
                        <div className={styles.form_body}>
                            <div className={styles.form_section}>
                                <div className={styles.section_label}>ADDRESS NICKNAME</div>
                                <div className={styles.section_field}>
                                    <SearchInputV2
                                        onSearch={(value) => { formSetter("nick_name", value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_body}>
                            <div className={styles.form_section}>
                                <div className={styles.section_label}>HOUSE / FLAT / BLOCK NO.</div>
                                <div className={styles.section_field}>
                                    <SearchInputV2
                                        onSearch={(value) => { formSetter("line_1", value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_body}>
                            <div className={styles.form_section}>
                                <div className={styles.section_label}>APPARTMENT / ROAD / AREA</div>
                                <div className={styles.section_field}>
                                    <SearchInputV2
                                        onSearch={(value) => { formSetter("line_2", value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_body}>
                            <div className={styles.form_section}>
                                <div className={styles.section_label}>LANDMARK</div>
                                <div className={styles.section_field}>
                                    <SearchInputV2
                                        onSearch={(value) => { formSetter("line_3", value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_body}>
                            <div className={styles.form_section}>
                                <div className={styles.section_label}>MOBILE NO.</div>
                                <div className={styles.section_field}>
                                    <SearchInputV2
                                        type="number"
                                        maxCharacter={10}
                                        onSearch={(value) => { formSetter("mob", value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className={styles.delivery_notice}>
                            Note: We're currently delivering our tasty meals exclusively in Guwahati only
                        </div>
                        <div
                            className={styles.submit_cta}
                            style={{ opacity: disableSubmit() ? "0.5" : "1" }}
                            onClick={() => {
                                if (disableSubmit()) {
                                    return
                                }
                                else {
                                    submitHandler()
                                }
                            }
                            }
                        >
                            {
                                postLoading ? <CircularLoader/> : disableSubmit() ? disableSubmit() : "Submit"
                            }
                        </div>
                        <div className={styles.add_later_cta} onClick={() => { setShowAddressForm(false) }}>
                            Add later
                        </div>
                    </div>
                }
            </div>
        </BottomTray>
    )
}

export default AddressTray