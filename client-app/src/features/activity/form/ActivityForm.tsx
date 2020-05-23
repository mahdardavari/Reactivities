import React, { useState, FormEvent, useContext } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "./../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";

import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";

interface Iprops {
  activity: IActivity;
}

const ActivityForm: React.FC<Iprops> = ({

  activity: initializeFormState,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
  } = activityStore;
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);
  const handleChangeInput = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //console.log(event.target.value);
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleChangeInput}
          name="title"
          placeholder="Title"
          value={activity.title}
        ></Form.Input>
        <Form.Input
          onChange={handleChangeInput}
          name="description"
          placeholder="Description"
          value={activity.description}
          rows={2}
        ></Form.Input>
        <Form.Input
          onChange={handleChangeInput}
          name="category"
          placeholder="Category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          onChange={handleChangeInput}
          name="date"
          placeholder="Date"
          type="datetime-local"
          value={activity.date}
        ></Form.Input>
        <Form.Input
          onChange={handleChangeInput}
          name="city"
          placeholder="City"
          value={activity.city}
        ></Form.Input>
        <Form.Input
          onChange={handleChangeInput}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        ></Form.Input>
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm) ;
