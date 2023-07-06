import React from 'react';
import styled from 'styled-components';

import { getData, setNewProduct, uploadPhotoAndGetUrl } from '@/services/firebase';
import getOption from '@/helper/getOption';

import Select from '../Forms/Select';
import InputText from '../Forms/InputText';
import Button from '../Forms/Button';
import useForm from '@/hooks/useForm';
import { useRouter } from 'next/router';

const DivCreateProduct = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 20px;
    margin-top: 20px;
    .productData {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      gap: 20px;      
      .inputFile {
          width: 300px;
          text-align: right;
        }
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
  const {push} = useRouter();
  const [menu, setMenu] = React.useState<Menu>();
  const [selectedCategory, setSelectedCategory] = React.useState<OptionsObject|null>(null);
  const [selectedType, setSelectedType] = React.useState<OptionsObject|null>(null);
  const productName = useForm(null);
  const productDescription = useForm(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoFile, setPhotoFile] = React.useState<File|null>(null);
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    label: 'Cadastrar Produto',
    status: null,
    msg: null
  });

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

  function handleCreateProductSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const productId = `${getOption(selectedType as OptionsObject)}-${productName.value.replace(/\s/g, '')}`;

    if(productName.error || productDescription.error) {
      setStatusSubmit({
        label: 'Cadastrar Produto',
        status: 'error',
        msg: 'Preencha todos os campos!'
      });
    } else if(!photoFile || !selectedCategory ) {
      setStatusSubmit({
        label: 'Cadastrar Produto',
        status: 'error',
        msg: 'Selecione uma imagem antes!'
      });
    } else {
      uploadPhotoAndGetUrl(
        getOption(selectedCategory),
        photoFile.name,
        photoFile as File
      ).then((photoUrl) =>
        setNewProduct(getOption(selectedCategory as OptionsObject), getOption(selectedType as OptionsObject), productId, productName.value, productDescription.value, photoUrl)
      );
      setStatusSubmit({
        label: 'Cadastrar Produto',
        status: 'sucess',
        msg: 'Produto Cadastrado com Sucesso!'
      });
      push('admin');
    }
  }

  React.useEffect(() => {
    getData<Menu>('cardapio', setMenu as React.Dispatch<React.SetStateAction<Menu>>)
  },[]);
  
  React.useEffect(() => {
    setSelectedType(null);
  },[selectedCategory])

  return (
    <DivCreateProduct  className='envelope animeLeft'>
      <h1>Cadastro de Produtos</h1>
      {menu &&
        <form
          className='form'
          onSubmit={handleCreateProductSubmit}
        >
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
            <div className='productData'>
              <InputText
                label="Nome:" type="text" name="name" {...productName}
              />
              <InputText
                label="Descrição:" type="text" name="description" {...productDescription}
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
              <Button
                statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
                className='buttonSubmit'
              />
            </div>
          }
        </form>
      }
    </DivCreateProduct>
  )
}

export default CreateProduct;