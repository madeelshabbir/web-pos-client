import { ChangeEvent, useEffect, useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, Pagination } from '@mui/material';
import { Item } from '../types/interfaces/api/item';
import { ItemsApi } from '../apis/items';
import { notify } from '../utils/toastify';
import { Toast } from '../types/enums/toast';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const CataloguePage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
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
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {items.map(record => (
            <Grid item key={record.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
              <img src={record.cardFaceImage} alt={record.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {record.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {record.fromValue} - {record.toValue} {record.currency}
                  </Typography>
                </CardContent>
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
      </Container>
    </div>
  );
}

export default CataloguePage;
