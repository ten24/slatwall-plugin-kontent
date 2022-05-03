# UltraCommerce React Plugin

UltraCommerce product selector is an advanced custom element which allows users to add one or multiple products from their product catalog to a Kontent CMS page by search, category, product type, and brand filters.


## For Local Development

- use node v16.6.0 (npm 7.x)
- npm install
- Create a .env.local and add the below lines while makse suse to set the appropriate values.This allow you to develop the app outside of kontent. Some functionality like save will not work.

        REACT_APP_SLATWALL_URL=
        REACT_APP_SLATWALL_IMAGE_HOST=
        REACT_APP_SLATWALL_SITE_CODE=
        REACT_APP_DEV_MODE=true

- npm run start
- Vist: http://localhost:3006/product-picker. This urls shows the picker as it will be embedded in Kontent.

## Aditional Notes

- In order to use this plugin with the UltraCommerce platform you will need the add two entries to the global setting "Cors Whitelist" of your UltraCommerce enviroment. One entry for the Kontent domain and one entry for your plugin domain. The entry for Kontent is below.
- `^http(s?):\/\/(.*\.)?kontent\.ai.`
