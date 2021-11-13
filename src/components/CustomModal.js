import React, { useState, useEffect } from "react"
import { View, Modal } from "react-native"

const CustomModal = ({ visible, children, url }) => {

    const [showModal, setshowModal] = useState(visible)

    React.useEffect(() => {

        toggleModal()

    }, [visible])

    const toggleModal = () => {
        visible === true ? setshowModal(true) : setshowModal(false)
    }

    return (
        <Modal
            transparent
            visible={showModal}
        >

            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
            }}>

                <View>{children}</View>

            </View>

        </Modal>
    );

}

export default CustomModal;