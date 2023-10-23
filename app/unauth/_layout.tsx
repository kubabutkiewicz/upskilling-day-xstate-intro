import React from "react";
import Loader from "../../components/Loader";
import { Slot } from "expo-router";

const _layout = () => {
  return (
    <Loader>
      <Slot />
    </Loader>
  );
};

export default _layout;
