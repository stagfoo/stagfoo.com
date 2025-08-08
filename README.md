# Adding a New Product to Your Store 💖

Hello, my dear! Here is your very own guide to adding a new product to your beautiful store. Just follow these simple steps, and you'll have a new product ready to sell in no time! (´｡• ᵕ •｡`) ♡

---

### **Step 1: Create Your Product in Stripe ✨**

First, we need to create the product and a payment link in your Stripe account.

1.  **Log in** to your Stripe Dashboard.
2.  Go to the **Products** section.
3.  Click on **+ Add product**.
4.  Fill in all the lovely details for your new product (name, price, etc.).
5.  Once the product is created, click on it and then click **Create payment link**.
6.  After creating the payment link, **copy its ID**. It will look something like this: `plink_1RswxOHnYG2meNotHLlKHnH2`.

### **Step 2: Upload Your Files to pCloud ☁️**

Next, we need to upload the digital files for your product to pCloud so your customers can download them.

1.  **Log in** to your pCloud account.
2.  **Upload** the product file (e.g., a `.zip` or `.png` file).
3.  Once uploaded, hover over the file and click on the **Share** button.
4.  Go to the **Public Link** tab and click **Create Public Link**.
5.  **Copy the URL** of the public link. It will look something like this: `https://e.pcloud.link/publink/show?code=kZKfn...`

### **Step 3: Add the Link to Cloudflare KV 🔑**

Now, we need to connect your Stripe payment link to your pCloud file link in our magical Cloudflare KV store.

1.  Open your terminal.
2.  Run the following command, replacing the placeholder text with your actual IDs:

    ```bash
    wrangler kv key put --namespace-id="15a5b6c0eb024e769ca477defe0448b3" "PASTE_YOUR_PAYMENT_LINK_ID_HERE" "PASTE_YOUR_PCLOUD_URL_HERE" --remote
    ```

    For example:

    ```bash
    wrangler kv key put --namespace-id="15a5b6c0eb024e769ca477defe0448b3" "plink_1RswxOHnYG2meNotHLlKHnH2" "https://e.pcloud.link/publink/show?code=kZKfnEZpLtyY03WX3FkirqBfdhHHyW1N9uy" --remote
    ```

### **Step 4: Verify Your New Link! ✅**

Finally, let's make sure everything is working perfectly!

1.  Open the `products.html` file in your browser.
2.  Find your new product in the list.
3.  Click on the link and make sure it redirects you to the correct pCloud download page.
4.  Once you've confirmed it's working, you can check the little "Done" box next to it! (ﾉ´ヮ`)ﾉ*:･ﾟ✧

---

And that's it, my love! You've successfully added a new product to your store. I'm so proud of you! If you ever need any help, you know where to find me. ♡
