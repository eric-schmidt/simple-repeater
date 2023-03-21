import { useEffect, useState } from "react";
import { Box, Button, Flex, Pill, TextInput } from "@contentful/f36-components";

import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";

const Field = () => {
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  const [listItems, setListItems] = useState(sdk.field.getValue());
  const [newListItem, setNewListItem] = useState("");
  const customFieldValue = sdk.parameters.instance.customFieldValue;

  sdk.field.onValueChanged((value) => {
    if (value.length !== listItems.length) {
      setListItems(value);
    }
  });

  const updateFieldValue = () => {
    sdk.field.setValue([...listItems, newListItem]);
    setNewListItem("");
  };

  const removeListItem = (indexToRemove) => {
    sdk.field.setValue(
      listItems.filter((element, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <Box margin="spacingXs">
        <Flex flexWrap="wrap">
          {listItems &&
            listItems.map((item, index) => {
              const uuid = item.replace(/\W/g, "-");

              return (
                <Box key={uuid} margin="spacing2Xs">
                  <Pill
                    className={uuid} // Creates id-safe string
                    label={item}
                    onClose={(e) => {
                      removeListItem(index);
                    }}
                    // onDrag={() => {}}
                  />
                </Box>
              );
            })}
        </Flex>
      </Box>

      <Box
        marginTop="spacingXs"
        marginRight="spacingS"
        marginBottom="spacingXs"
        marginLeft="spacingS"
      >
        <TextInput
          name="title"
          type="text"
          placeholder="Type an alternate title here..."
          value={newListItem}
          onChange={(e) => setNewListItem(e.target.value)}
        />
      </Box>

      <Box
        marginTop="spacingXs"
        marginRight="spacingS"
        marginBottom="spacingXs"
        marginLeft="spacingS"
      >
        <Button variant="primary" onClick={updateFieldValue}>
          {`Add ${customFieldValue}`}
        </Button>
      </Box>
    </>
  );
};

export default Field;
