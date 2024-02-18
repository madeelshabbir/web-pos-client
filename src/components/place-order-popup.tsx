import { FC, useState } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import QRCode from "react-qr-code";

import { errorMessage } from '../helpers/error';
import { Item } from '../types/interfaces/api/item';
import { OrdersApi } from '../apis/orders';
import { useError } from '../hooks/use-error';
import { PlaceOrderResponse } from '../types/interfaces/api/responses/place-order';
import { PlaceOrderRequest } from '../types/interfaces/api/requests/place-order';
import { placeOrderFormSchema } from '../validation-schemas/place-order';
import { placeOrderFormInitialValues } from '../fixtures/place-order-form';
import { notify } from '../utils/toastify';
import { Toast } from '../types/enums/toast';

interface ConfirmationPopupProps {
  item?: Item,
  open: boolean;
  onClose: () => void;
}

const PlaceOrderPopup: FC<ConfirmationPopupProps> = ({ item, open, onClose }) => {
  const [error, errorExtractor] = useError();
  const [order, setOrder] = useState<PlaceOrderResponse>();

  const placeOrder = async (values: Record<string, any>) => {
    if (item) {
      const response = await new OrdersApi().create({
        itemId: item?.id ?? '',
        price: values.price,
      });

      if (response.error) {
        if (response.error.general) {
          notify(response.error.general, Toast.ERROR);
        } else {
          errorExtractor(response);
        }

        return;
      }

      setOrder(response);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      { order ?
        <>
          <DialogTitle>Your Claim URL</DialogTitle>
          <DialogContent>
            <QRCode value="hey" />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setOrder(undefined);
                onClose();
              }}
            >
              Close
            </Button>
          </DialogContent>
        </>
      :
        <>
          <DialogTitle>{item?.name}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={placeOrderFormInitialValues}
              validationSchema={placeOrderFormSchema}
              onSubmit={placeOrder}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                  />
                  <div className="text-red-500 text-sm">
                    { errorMessage<PlaceOrderRequest>('price', touched, errors, error) }
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    disabled={isSubmitting}
                  >
                    Place Order
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={() => {
                      setOrder(undefined);
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </>
      }
    </Dialog>
  );
}

export default PlaceOrderPopup;
