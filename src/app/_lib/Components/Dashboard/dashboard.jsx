"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  Pagination,
  ConfigProvider,
  Button,
  Input,
} from "antd";
import Image from "next/image";
import { Logo } from "../../assets/photos";
import {
  db,
  setDoc,
  doc,
  getDoc,
  onAuthStateChanged,
  auth,
} from "../Firebase/Firebase";
import Loader from "../Loader/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "../context/DataContext";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const router = useRouter();
  const checkUserAuthentication = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userSignedUp = true;
        if (userSignedUp) {
          router.push("/dashboard");
        } else {
          router.push("/adminpanel");
        }
      } else {
        router.push("/adminpanel");
      }
    });
  };

  // states
  const [collapsed, setCollapsed] = useState(false);

  const {
    locationData,
    setLocationData,
    categoryData,
    setCategoryData,
    subCategoryData,
    setSubCategoryData,
    cityData,
    setCityData,
    wordPrice,
    setWordPrice,
  } = useContext(DataContext);
  const [locationInp, setLocationInp] = useState("");
  const [categoryInp, setCategoryInp] = useState("");
  const [subCategoryInp, setSubCategoryInp] = useState("");
  const [cityInp, setCityInp] = useState("");

  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [editCategoryIndex, setEditCategoryIndex] = useState(-1);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [editSubCategoryValue, setEditSubCategoryValue] = useState("");
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [editCityValue, setEditCityValue] = useState("");
  const [editingCity, setEditingCity] = useState(null);

  const [name, setName] = useState("");

  const [editWordIndex, setEditWordIndex] = useState(-1);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const [loadingStates, setLoadingStates] = useState({});
  const [option, setOption] = useState(false);
  const [save, setSave] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  //  screens
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const handleMenuClick = (key) => {
    setActiveMenu(key);
  };

  // Fetch data from Firestore
  useEffect(() => {
    checkUserAuthentication();
    const fetchData = async () => {
      // Fetch location data
      const locationDocRef = doc(db, "dashboard", "Location");
      const locationDocSnap = await getDoc(locationDocRef);
      if (locationDocSnap.exists()) {
        setLocationData(locationDocSnap.data().name || []);
      }
    };
    fetchData();
    fetchCityData();
    fetchCategoryData();
    fetchWordData();
  }, []);
  // Add location button
  const handlelocation = async () => {
    setOption(true);
    if (locationInp.trim() !== "") {
      const docRef = doc(db, "dashboard", "Location");
      const docSnap = await getDoc(docRef);
      let locations = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.name)) {
          locations = data.name;
        }
      }
      locations.push(locationInp);
      await setDoc(docRef, { name: locations });
      setLocationData(locations);
      setLocationInp("");
    } else {
      alert("Please Fill Input!");
    }
    setOption(false);
  };

  // Delete location
  const deleteLocation = async (value) => {
    setLoadingStates((prev) => ({ ...prev, [value]: true }));

    const docRef = doc(db, "dashboard", "Location");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let locations = docSnap.data().name;

      locations = locations.filter((location) => location !== value);
      await setDoc(docRef, { name: locations });
      setLocationData(locations);
    }
    setLoadingStates((prev) => ({ ...prev, [value]: false }));
  };

  // Update location

  const handleLocationEdit = (index) => {
    setEditIndex(index);
    setEditValue(locationData[index]);
  };

  const handleLocationCancel = () => {
    setEditIndex(-1);
  };

  const handleSave = async (index) => {
    setSave(true);
    const docRef = doc(db, "dashboard", "Location");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let locations = docSnap.data().name;
      locations[index] = editValue;
      await setDoc(docRef, { name: locations });
      setLocationData(locations);
    }
    setEditIndex(-1);
    setSave(false);
  };
  // Location End
  // Category start
  // fetching  category data
  const fetchCategoryData = async () => {
    const categoryDocRef = doc(db, "dashboard", "Category");
    const categoryDocSnap = await getDoc(categoryDocRef);

    if (categoryDocSnap.exists()) {
      setCategoryData(categoryDocSnap.data().name || []);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    setOption(true);

    if (categoryInp.trim() !== "") {
      const categoryDocRef = doc(db, "dashboard", "Category");
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const categories = categoryDocSnap.data().name || [];
        const existingCategory = categories.find(
          (cat) => cat.name === categoryInp
        );

        if (existingCategory) {
          alert("Category already exists!");
        } else {
          const newCategory = { name: categoryInp, subcategories: [] };
          categories.push(newCategory);
          await setDoc(categoryDocRef, { name: categories });

          setCategoryData(categories);
          setCategoryInp("");
        }
      }
    } else {
      alert("Please fill input for category!");
    }

    setOption(false);
  };

  // Delete category
  const handleDeleteCategory = async (value) => {
    setLoadingStates((prev) => ({ ...prev, [value]: true }));
    try {
      const docRef = doc(db, "dashboard", "Category");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let categories = docSnap.data().name;

        categories = categories.filter((category) => category.name !== value);
        await setDoc(docRef, { name: categories });
        setCategoryData(categories);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [value]: false }));
    }
  };

  // Edit category
  const handleEditCategory = (index) => {
    setEditCategoryIndex(index);
    setEditCategoryValue(categoryData[index].name);
  };
  const handleSaveCategory = async (index) => {
    setSave(true);

    const docRef = doc(db, "dashboard", "Category");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let categories = docSnap.data().name || [];
      categories[index].name = editCategoryValue;
      await setDoc(docRef, { name: categories });
      setCategoryData(categories);
    }

    setEditCategoryIndex(-1);
    setSave(false);
  };

  // Show subcategories for a category

  const showSubCategory = async (categoryName) => {
    setActiveMenu("subcategory");
    setName(categoryName);

    try {
      const categoryDocRef = doc(db, "dashboard", "Category");
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const categoryData = categoryDocSnap.data();

        const selectedCategory = categoryData.name.find(
          (category) => category.name === categoryName
        );

        if (selectedCategory) {
          const subcategories = selectedCategory.subcategories;
          setSubCategoryData(subcategories);
        } else {
          setSubCategoryData([]);
        }
      } else {
        setSubCategoryData([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategoryData([]);
    }
  };

  // category end
  // subcategory start
  // add data in subcategories
  const handleAddSubCategory = async () => {
    setOption(true);

    if (subCategoryInp.trim() !== "") {
      try {
        const subcategoryDocRef = doc(db, "dashboard", "Category");
        const subcategoryDocSnap = await getDoc(subcategoryDocRef);

        if (subcategoryDocSnap.exists()) {
          const categoryData = subcategoryDocSnap.data().name || [];
          const selectedCategory = categoryData.find(
            (category) => category.name === name
          );

          if (selectedCategory) {
            if (selectedCategory.subcategories.includes(subCategoryInp)) {
              alert("Subcategory already exists!");
            } else {
              selectedCategory.subcategories.push(subCategoryInp);

              await setDoc(subcategoryDocRef, { name: categoryData });
              const updatedSubcategories = selectedCategory.subcategories;
              setSubCategoryData(updatedSubcategories);
              setSubCategoryInp("");
            }
          }
        } else {
          alert("Category document does not exist!");
        }
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    } else {
      alert("Please fill input for subcategory!");
    }

    setOption(false);
  };

  // delete sub category
  const handleDeleteSubCategory = async (subcategoryToDelete) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [subcategoryToDelete]: true,
    }));

    try {
      const subcategoryDocRef = doc(db, "dashboard", "Category");
      const subcategoryDocSnap = await getDoc(subcategoryDocRef);

      if (subcategoryDocSnap.exists()) {
        let categoryData = subcategoryDocSnap.data().name || [];
        let selectedCategory = categoryData.find(
          (category) => category.name === name
        );

        if (selectedCategory) {
          selectedCategory.subcategories =
            selectedCategory.subcategories.filter(
              (subcategory) => subcategory !== subcategoryToDelete
            );

          await setDoc(subcategoryDocRef, { name: categoryData });
          const updatedSubcategories = selectedCategory.subcategories;
          setSubCategoryData(updatedSubcategories);
        }
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }

    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [subcategoryToDelete]: false,
    }));
  };
  // update sub category

  // Edit subcategory
  const handleSubCategoryEdit = (value) => {
    setEditSubCategoryValue(value);
    setEditingSubCategory(value);
  };

  // Cancel edit
  const handleSubCategoryCancel = () => {
    setEditSubCategoryValue("");
    setEditingSubCategory(null);
  };

  // Save edited subcategory
  const handleSubCategorySave = async () => {
    setSave(true);

    try {
      const subcategoryDocRef = doc(db, "dashboard", "Category");
      const subcategoryDocSnap = await getDoc(subcategoryDocRef);

      if (subcategoryDocSnap.exists()) {
        let categoryData = subcategoryDocSnap.data().name || [];
        let selectedCategory = categoryData.find(
          (category) => category.name === name
        );

        if (selectedCategory) {
          const index = selectedCategory.subcategories.findIndex(
            (subcategory) => subcategory === editingSubCategory
          );

          if (index !== -1) {
            selectedCategory.subcategories[index] = editSubCategoryValue;
            await setDoc(subcategoryDocRef, { name: categoryData });

            // Update displayed subcategories after saving
            setSubCategoryData(selectedCategory.subcategories);
          }
        }
      }
    } catch (error) {
      console.error("Error saving subcategory:", error);
    }

    // Clear edit states after saving
    setEditSubCategoryValue("");
    setEditingSubCategory(null);
    setSave(false);
  };
  // city
  const inpCity = (e) => {
    setCityInp(e.target.value);
  };
  // get city data
  const fetchCityData = async () => {
    try {
      const cityDocRef = doc(db, "dashboard", "Cities");
      const cityDocSnap = await getDoc(cityDocRef);
      if (cityDocSnap.exists()) {
        const cityDataFromDB = cityDocSnap.data().name;
        if (Array.isArray(cityDataFromDB)) {
          setCityData(cityDataFromDB);
        }
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
  // add city
  const handleCityAdd = async () => {
    setOption(true);
    if (cityInp.trim() !== "") {
      const docRef = doc(db, "dashboard", "Cities");
      const docSnap = await getDoc(docRef);
      let cities = [];
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.name)) {
          cities = data.name;
        }
      }
      cities.push(cityInp);
      await setDoc(docRef, { name: cities });
      setCityData(cities);
      setCityInp("");
    } else {
      alert("Please fill in the input!");
    }
    setOption(false);
  };
  // delete city
  const deleteCity = async (value) => {
    setLoadingStates((prev) => ({ ...prev, [value]: true }));
    try {
      const docRef = doc(db, "dashboard", "Cities");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let cities = docSnap.data().name;
        cities = cities.filter((city) => city !== value);
        await setDoc(docRef, { name: cities });
        setCityData(cities);
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      // Handle error as needed
    } finally {
      setLoadingStates((prev) => ({ ...prev, [value]: false }));
    }
  };

  // edit city
  const handleCityEdit = (value) => {
    setEditCityValue(value);
    setEditingCity(value);
  };

  const handleCityCancel = () => {
    setEditCityValue("");
    setEditingCity(null);
  };
  // update save
  const handleCitySave = async () => {
    setSave(true);
    const docRef = doc(db, "dashboard", "Cities");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let cities = docSnap.data().name;
      const index = cities.findIndex((city) => city === editingCity);
      if (index !== -1) {
        cities[index] = editCityValue;
        await setDoc(docRef, { name: cities });
        setCityData(cities);
      }
    }
    setEditCityValue("");
    setEditingCity(null);
    setSave(false);
  };

  // Word Count
  // read data
  const fetchWordData = async () => {
    try {
      const WordDocRef = doc(db, "dashboard", "Word Count");
      const wordDocSnap = await getDoc(WordDocRef);

      if (wordDocSnap.exists()) {
        const data = wordDocSnap.data();
        setWordPrice(data.name || []);
      }
    } catch (error) {
      console.error("Error fetching word data:", error.message);
    }
  };
  // Update edited data in Firestore
  const handleSaveEdit = async (index) => {
    setSave(true);
    try {
      const updatedWordPrice = [...wordPrice];
      updatedWordPrice[index] = { name: editedName, price: editedPrice };

      const WordDocRef = doc(db, "dashboard", "Word Count");
      await setDoc(WordDocRef, { name: updatedWordPrice });

      setWordPrice(updatedWordPrice);
      setEditWordIndex(-1);
    } catch (error) {
      console.error("Error saving edit:", error.message);
    }
    setSave(false);
  };

  // Handle edit icon click
  const handleWordEdit = (index, name, price) => {
    setEditWordIndex(index);
    setEditedName(name);
    setEditedPrice(price);
  };

  // pagination
  const indexOfLastCity = currentPage * pageSize;
  const indexOfFirstCity = indexOfLastCity - pageSize;
  const currentCities = cityData.slice(indexOfFirstCity, indexOfLastCity);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ padding: "16px" }}>
          <Image src={Logo} alt="Dawn" width={140} height={120} />
        </div>
        <Menu
          theme="light"
          selectedKeys={[activeMenu]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item
            key="dashboard"
            onClick={() => handleMenuClick("dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item key="location" onClick={() => handleMenuClick("location")}>
            Location
          </Menu.Item>
          <Menu.Item key="category" onClick={() => handleMenuClick("category")}>
            Category
          </Menu.Item>
          {activeMenu === "subcategory" && (
            <Menu.Item
              key="subcategory"
              onClick={() => handleMenuClick("subcategory")}
            >
              Sub Category
            </Menu.Item>
          )}
          <Menu.Item key="city" onClick={() => handleMenuClick("city")}>
            City
          </Menu.Item>
          <Menu.Item key="words" onClick={() => handleMenuClick("words")}>
            Word Count
          </Menu.Item>
        </Menu>
      </Sider>
      {activeMenu === "dashboard" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-4 col-xl-3">
                  <div className="card order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Locations</h6>
                      <h2 className="text-left">
                        <span>{locationData.length}</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card  order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Categories</h6>
                      <h2 className="text-left">
                        <span>{categoryData.length}</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card  order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Sub Categories</h6>
                      <h2 className="text-left">
                        <span>{subCategoryData.length}</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card  order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Cities</h6>
                      <h2 className="text-left">
                        <span>{cityData.length}</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      )}

      {/* Location Section */}
      {activeMenu === "location" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Location</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>
              <div className="row">
                <Input
                  onChange={(e) => {
                    setLocationInp(e.target.value);
                  }}
                  value={locationInp}
                  className="col-12"
                />
                <Button
                  type="primary"
                  onClick={handlelocation}
                  className="col-3 mt-2 addbtn"
                  loading={option}
                >
                  Add Location
                </Button>
              </div>

              <div className="container mx-auto p-4">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th className=" text-center">No.</th>
                        <th className=" text-center">Location</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locationData.map((value, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 text-center">{index + 1}</td>
                          <td className="py-2 px-4 ">
                            {editIndex === index ? (
                              <Input
                                value={editValue}
                                onChange={(e) => {
                                  setEditValue(e.target.value);
                                }}
                                className="col-6"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              value
                            )}
                          </td>
                          <td className="py-2 px-4 text-center ">
                            {editIndex === index ? (
                              <>
                                <Button
                                  type="primary"
                                  onClick={() => handleSave(index)}
                                  className="mr-2"
                                  loading={save}
                                  style={{ width: "100px" }}
                                >
                                  Save
                                </Button>
                                <Button onClick={handleLocationCancel}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleLocationEdit(index)}
                                  className="mr-2"
                                >
                                  <FaEdit
                                    style={{
                                      color: "#1677ff",
                                      fontSize: "30px",
                                    }}
                                  />
                                </button>
                                <button onClick={() => deleteLocation(value)}>
                                  {loadingStates[value] ? (
                                    <Loader />
                                  ) : (
                                    <MdDelete
                                      style={{
                                        color: "#d92929",
                                        fontSize: "30px",
                                      }}
                                    />
                                  )}
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      )}
      {/* Category Section */}
      {activeMenu === "category" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ padding: 24, minHeight: 360 }}>
              <div className="row">
                <Input
                  onChange={(e) => {
                    setCategoryInp(e.target.value);
                  }}
                  value={categoryInp}
                  className="col-12"
                />
                <Button
                  type="primary"
                  onClick={handleAddCategory}
                  className="col-3 mt-2 addbtn"
                  loading={option}
                  style={{ width: "150px", marginTop: "10px" }}
                >
                  Add Category
                </Button>
              </div>

              <div className="container mx-auto p-4">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-light ">
                      <tr>
                        <th className=" text-center">No.</th>

                        <th className=" text-center">Category</th>
                        <th className=" text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.map((category, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 text-center ">
                            {index + 1}
                          </td>

                          <td>
                            {editCategoryIndex === index ? (
                              <Input
                                value={editCategoryValue}
                                onChange={(e) => {
                                  setEditCategoryValue(e.target.value);
                                }}
                                className="col-6"
                              />
                            ) : (
                              category.name
                            )}
                          </td>
                          <td>
                            {editCategoryIndex === index ? (
                              <>
                                <Button
                                  type="primary"
                                  onClick={() => handleSaveCategory(index)}
                                  className="mr-2"
                                  loading={save}
                                  style={{ width: "100px" }}
                                >
                                  Save
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditCategoryIndex(-1);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditCategory(index)}
                                >
                                  <FaEdit
                                    style={{
                                      color: "#1677ff",
                                      fontSize: "30px",
                                    }}
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCategory(category.name)
                                  }
                                >
                                  {loadingStates[category.name] ? (
                                    <Loader />
                                  ) : (
                                    <MdDelete
                                      style={{
                                        color: "#d92929",
                                        fontSize: "30px",
                                      }}
                                    />
                                  )}
                                </button>
                                <Button
                                  onClick={() => showSubCategory(category.name)}
                                  className="ml-2"
                                  type="primary"
                                  style={{ width: "130px" }}
                                >
                                  Sub Category
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      )}
      {/* SUB CATEGORY Section   */}
      {activeMenu === "subcategory" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Sub Category / {name}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>
              <div className="row">
                <Input
                  className="col-12"
                  onChange={(e) => {
                    setSubCategoryInp(e.target.value);
                  }}
                  value={subCategoryInp}
                />
                <Button
                  type="primary"
                  className="col-3 mt-2 addbtn"
                  loading={option}
                  style={{ width: "150px", marginTop: "10px" }}
                  onClick={handleAddSubCategory}
                >
                  Add SubCategory
                </Button>
              </div>

              <div className="container mx-auto p-4">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th className=" text-center">No.</th>
                        <th className=" text-center">Sub Category</th>
                        <th className=" text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subCategoryData.map((subcategory, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="py-2 px-4">
                            {editingSubCategory === subcategory ? (
                              <Input
                                value={editSubCategoryValue}
                                onChange={(e) =>
                                  setEditSubCategoryValue(e.target.value)
                                }
                                className="col-6"
                              />
                            ) : (
                              subcategory
                            )}
                          </td>
                          <td className="py-2 px-4">
                            {editingSubCategory === subcategory ? (
                              <>
                                <Button
                                  type="primary"
                                  onClick={handleSubCategorySave}
                                  className="mr-2"
                                  loading={save}
                                  style={{ width: "100px" }}
                                >
                                  Save{" "}
                                </Button>
                                <Button onClick={handleSubCategoryCancel}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    handleSubCategoryEdit(subcategory)
                                  }
                                >
                                  <FaEdit
                                    style={{
                                      color: "#1677ff",
                                      fontSize: "30px",
                                    }}
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteSubCategory(subcategory)
                                  }
                                >
                                  {loadingStates[subcategory] ? (
                                    <Loader style={{ color: "red" }} />
                                  ) : (
                                    <MdDelete
                                      style={{
                                        color: "red",
                                        fontSize: "30px",
                                      }}
                                    />
                                  )}
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <Pagination
                  style={{ marginTop: "20px", textAlign: "center" }}
                  current={currentPage}
                  pageSize={pageSize}
                  total={subCategoryData.length}
                  onChange={onSubCategoryPageChange}
                /> */}
              </div>
            </div>
          </Content>
        </Layout>
      )}
      {/* City Section */}
      {activeMenu === "city" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>City</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>
              <div className="row">
                <Input onChange={inpCity} value={cityInp} className="col-12" />
                <Button
                  type="primary"
                  onClick={handleCityAdd}
                  className="col-3 mt-2 addbtn"
                  loading={option}
                  style={{ width: "150px", marginTop: "10px" }}
                >
                  Add City
                </Button>
              </div>

              <div className="container mx-auto p-4">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th className=" text-center"> No.</th>
                        <th className=" text-center">City</th>
                        <th className=" text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCities.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="py-2 px-4">
                            {editingCity === value ? (
                              <Input
                                value={editCityValue}
                                onChange={(e) =>
                                  setEditCityValue(e.target.value)
                                }
                                className="col-6"
                              />
                            ) : (
                              value
                            )}
                          </td>
                          <td className="py-2 px-4">
                            {editingCity === value ? (
                              <>
                                <Button
                                  type="primary"
                                  onClick={handleCitySave}
                                  className="mr-2"
                                  loading={save}
                                  style={{ width: "100px" }}
                                >
                                  Save{" "}
                                </Button>
                                <Button onClick={handleCityCancel}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => handleCityEdit(value)}>
                                  <FaEdit
                                    style={{
                                      color: "#1677ff",
                                      fontSize: "30px",
                                    }}
                                  />
                                </button>
                                <button onClick={() => deleteCity(value)}>
                                  {loadingStates[value] ? (
                                    <Loader />
                                  ) : (
                                    <MdDelete
                                      style={{
                                        color: "red",
                                        fontSize: "30px",
                                      }}
                                    />
                                  )}
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  style={{ marginTop: "20px", textAlign: "center" }}
                  current={currentPage}
                  pageSize={pageSize}
                  total={cityData.length}
                  onChange={onPageChange}
                />
              </div>
            </div>
          </Content>
        </Layout>
      )}

      {/* Words Count */}
      {activeMenu === "words" && (
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <h2 className="heading">Price of Single Word Count</h2>
            <div className="container mx-auto p-4">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className=" text-center"> No.</th>
                      <th className=" text-center">City</th>
                      <th className=" text-center">Price</th>
                      <th className=" text-center">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordPrice.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {editWordIndex === index ? (
                            <Input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                          ) : (
                            data.name
                          )}
                        </td>
                        <td className="text-center">
                          {editWordIndex === index ? (
                            <Input
                              type="text"
                              value={editedPrice}
                              onChange={(e) => setEditedPrice(e.target.value)}
                            />
                          ) : (
                            data.price
                          )}
                        </td>
                        <td className="text-center">
                          {editWordIndex === index ? (
                            <>
                              <Button
                                onClick={() => handleSaveEdit(index)}
                                loading={save}
                                style={{ width: "100px", marginRight: "2px" }}
                                type="primary"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditWordIndex(-1);
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                handleWordEdit(index, data.name, data.price)
                              }
                            >
                              <FaEdit
                                style={{ color: "#1677ff", fontSize: "20px" }}
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Content>
        </Layout>
      )}
    </Layout>
  );
}
