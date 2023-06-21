import React from 'react';
import styled from 'styled-components';

import { getProducts, getUrlPortions } from '@/services/firebase';
import getOption from '@/helper/getOption';
import Select from '../Forms/Select';
import InputText from '../Forms/InputText';

const DivCreateProduct = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 15px;
    margin-top: 20px;
    .inputFile {
      width: 280px;
      text-align: right;
    }
  }
`;

const DivImage = styled.div<BgProps>`
  width: 250px;
  min-height: 200px;
  border: 2px solid ${props => props.theme.colors.primaryColor};
  background: ${props => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

const CreateProduct = () => {
  const [menu, setMenu] = React.useState<Menu>();
  const [selectedCategory, setSelectedCategory] = React.useState<OptionsObject|null>(null);
  const [selectedType, setSelectedType] = React.useState<OptionsObject|null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoFile, setPhotoFile] = React.useState<File|null>(null);
  const [photoUrl, setPhotoUrl] = React.useState<string|null>(null);

  function makeCategoryObject(objectRef:MenuProducts|{[key: string]: Portions}) {
    const arrayCategories = Object.keys(objectRef)
    return arrayCategories.reduce((obj:OptionsObject, item) => {
      obj[item] = null;
      return obj
    }, {});
  }

  function onFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }
    const photoPreviewURL = URL.createObjectURL(files[0])
    setPhotoFile(files[0]);
    setPhotoPreview(photoPreviewURL);
  }

  React.useEffect(() => {
    getProducts('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[]);

  // React.useEffect(() => {
  //   menu && selectedCategory && selectedType && console.log(menu.products[getOption(selectedCategory)].products[getOption(selectedType)])
  // }, [menu, selectedCategory, selectedType])

  React.useEffect(() => {
    selectedCategory && photoFile && getUrlPortions(
      getOption(selectedCategory),
      photoFile.name,
      photoFile as File,
      setPhotoUrl as React.Dispatch<React.SetStateAction<string>>
    );
  },[selectedCategory, photoFile])

  React.useEffect(() => {
    console.log(photoUrl)
  })

  return (
    <DivCreateProduct  className='envelope animeLeft'>
      <h1>Cadastro de Produtos</h1>
      {menu &&
        <div className='form'>
          <Select
            name="category"
            label="Categoria:"
            initial="Escolha a categoria"
            options={makeCategoryObject(menu.products)}
            selectedOption={selectedCategory} setSelectedOption={setSelectedCategory}
          />
          {selectedCategory && <Select
            name="type"
            label="Tipo:"
            initial="Escolha a categoria"
            options={makeCategoryObject(menu.products[getOption(selectedCategory)].products)}
            selectedOption={selectedType} setSelectedOption={setSelectedType}
          />}
          {selectedType && 
            <div className='form'>
              <InputText
                label="Identificador:" type="text" name="id"
              />
              <InputText
                label="Nome:" type="text" name="name"
              />
              <InputText
                label="Descrição:" type="text" name="description"
              />
              <input
                onChange={onFileSelected}
                name="image"
                type="file"
                id="media"
                accept="image/*"
                className="inputFile"
              />
              {photoPreview &&
                <DivImage
                  bgImage={photoPreview}
                />
              }
            </div>
          }
        </div>
      }
    </DivCreateProduct>
  )
}

export default CreateProduct;