import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Col,
  Spinner,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useSelector, useDispatch } from "react-redux";
import { getUsersData } from "slices/userDataSlice";

const Tables = () => {
  const { data, status, numberValue, flag } = useSelector(
    (state) => state.userData
  );
  const userDataList = data;
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getUsersData());
    }
  }, [data]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Col width={["xs", "sm", "md", "lg", "xl", "xxl"]}>
                    <h3 className="mb-0">
                      Users | Number generated = {numberValue} | {flag && flag}
                    </h3>
                  </Col>
                  <Col style={{ flex: "0" }}>
                    <Button
                      color="primary"
                      onClick={() => dispatch(getUsersData())}
                    >
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">EmpName</th>
                    <th scope="col">role</th>
                  </tr>
                </thead>
                <tbody>
                  {status === "pending" && (
                    <tr>
                      <td>
                        <Spinner></Spinner>
                      </td>
                    </tr>
                  )}
                  {userDataList.length > 0 &&
                    status === "success" &&
                    userDataList.map((item) => (
                      <tr key={item.Id}>
                        <td>{item.Id}</td>
                        <td>{item.empName}</td>
                        <td>{item.role}</td>
                      </tr>
                    ))}
                  {status === "failed" && <span>error</span>}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  );
};

export default Tables;
