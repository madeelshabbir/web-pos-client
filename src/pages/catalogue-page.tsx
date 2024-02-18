import { ChangeEvent, useEffect, useState } from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, Pagination } from '@mui/material';
import { Item } from '../types/interfaces/api/item';
import { ItemsApi } from '../apis/items';
import { notify } from '../utils/toastify';
import { Toast } from '../types/enums/toast';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import PlaceOrderPopup from '../components/place-order-popup';

const CataloguePage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length) {
      fetchItems();
    } else {
      navigate('/login');
    }
  }, [user]);

  const fetchItems = async () => {
    const rowCount = 6;

    const response = await new ItemsApi().get({ current: page, rowCount })

    if (response.error) {
      notify(response.error.general, Toast.ERROR);
    } else {
      setItems(response.items);
      setPage(response.current);
      setPageCount(Math.ceil(response.total / rowCount));
    }
  }

  const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <div>
      <Container sx={{ pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={4}>
          {items.map(record => (
            <Grid item key={record.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div>
                  <img src={record.cardFaceImage} alt={record.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {record.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {record.fromValue} - {record.toValue} {record.currency}
                    </Typography>
                  </CardContent>
                </div>
                <div className="mt-auto mx-2">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setSelectedItem(record);
                      setOpen(true);
                    }}
                    sx={{ mb: 1 }}
                  >
                    Place Order
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          sx={{ my: 4, justifyContent: 'center' }}
        />
        <PlaceOrderPopup
          item={selectedItem}
          open={open}
          onClose={() => setOpen(false)}
        />
      </Container>
    </div>
  );
}

export default CataloguePage;
