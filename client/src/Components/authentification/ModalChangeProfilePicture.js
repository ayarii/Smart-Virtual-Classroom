import React from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Feed,
  Header,
  Icon,
  Image,
  Modal,
} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";
import { UpdateProfilePicture } from "../../redux/slices/User";

function ModalChangeProfilePicture(props) {
  const Resources = useSelector((state) => state.user.Resources);

  const [open, setOpen] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const dispatch = useDispatch();

  const updatePicture = () => {
    var formData = new FormData();
    formData.append("multiple_resources", picture);
    console.log("this is pic");
    console.log(picture);
    dispatch(UpdateProfilePicture(formData));
    setOpen(false);
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setPicture(file);
    }
    if (status === "removed") {
      console.log(status, meta, file);
    }
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Image
            fluid
            centered
            style={{
              margin: "10px",
              height: "250px",
              width: "250px",
            }}
            label={{
              as: "a",
              color: "red",
              content: "Edit",
              icon: "edit",
              ribbon: true,
            }}
            src={Resources}
          />
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
            <br />
            <br />
            <Dropzone
              styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
              canCancel={true}
              canRemove={true}
              canRestart={true}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              accept="image/*"
              inputContent={(files, extra) =>
                extra.reject ? "Image files only" : "Drag Files"
              }
              styles={{
                dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
                inputLabel: (files, extra) =>
                  extra.reject ? { color: "red" } : {},
              }}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <Button
            content="Yep, Save"
            labelPosition="right"
            icon="checkmark"
            onClick={updatePicture}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalChangeProfilePicture;
