# 指定 Node.js 版本
FROM  node:16-alpine as install

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock 以單獨安裝依賴
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install --silents
COPY . .

FROM  node:16-alpine  as build
WORKDIR /app
COPY --from=install /app .

RUN yarn build

FROM  node:16-alpine 
WORKDIR /app

COPY --from=build /app .
# 執行應用程序
CMD [ "yarn", "start" ]

# 清理緩存和臨時文件，最小化映像大小
RUN yarn cache clean \
  && rm -rf /tmp/* /var/cache/apk/* \
  && rm -rf /root/.npm /root/.node-gyp


# --platform=linux/amd64