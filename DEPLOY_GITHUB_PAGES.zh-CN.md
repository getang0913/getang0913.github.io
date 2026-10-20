# 将 Ge Tang 的网站发布到 GitHub Pages

代码已经配置为通过 GitHub Actions 自动生成并发布静态网站。第一次需要注册 GitHub、创建仓库、上传网站文件和开启 Pages。以后提交更新后，同一个网址会自动更新。

```mermaid
flowchart LR
  A[注册 GitHub] --> B[创建网站仓库]
  B --> C[上传文件]
  C --> D[开启 Pages]
  D --> E[运行发布]
  E --> F[分享公开网址]
```

## 第一步 注册账号

1. 打开 https://github.com/signup 。
2. 用你长期使用的邮箱注册，设置用户名，完成邮箱验证。
3. 用户名会用于网站地址。显示在网站上的姓名仍是 Ge Tang，不需要让用户名与姓名完全相同。

注册和登录由你自己完成，不需要把密码或验证码发给任何人。

## 第二步 创建网站仓库

1. 登录后打开 https://github.com/new 。
2. Repository name 填写 `你的用户名.github.io`。例如，用户名如果是 `example-user`，仓库名就是 `example-user.github.io`。
3. Visibility 选择 **Public**，用于 GitHub 免费账户的 Pages 托管。
4. 暂时不要勾选 Add README、Add .gitignore 或 License，因为上传包已有项目文件。
5. 点击 **Create repository**。

按这个命名方式，网址将是 `https://你的用户名.github.io/`。如果采用其他仓库名，代码也支持 `https://你的用户名.github.io/仓库名/`，但新手建议先用前者。

## 第三步 上传已经整理好的网站文件

请使用本目录里的 `github-pages-upload.zip`，不要把原始工作文件夹整体上传。

1. 在 Mac 上双击压缩包，将它解压。
2. 打开解压后的 `github-pages-upload` 文件夹。
3. 按 **Command + Shift + .** 显示隐藏文件，确认能看见 `.github`、`.gitignore` 和 `.openai`。
4. 在 GitHub 新仓库页面点击 **uploading an existing file**；如果已经有文件，选择 **Add file → Upload files**。
5. 在 Finder 中选中上传文件夹里面的全部文件与子文件夹，拖入 GitHub 上传区域。上传的是里面的内容，不是外面的 `github-pages-upload` 文件夹或 ZIP 本身。
6. 点击 **Commit changes**，提交到 `main` 分支。

上传完成后，仓库最外层应当能看到 `app`、`public`、`scripts`、`package.json` 和 `.github`，而不是只有一个 `github-pages-upload` 文件夹。

包内仅有网站代码、公开照片和已去掉手机号的 CV PDF。原始 Word 文件、原始微信照片文件、临时截图、依赖目录及本地状态没有放进包里。

## 第四步 开启 Pages 自动发布

1. 在仓库顶部选择 **Settings**。
2. 左侧找到 **Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 切换到仓库的 **Actions** 页面。
5. 点击 **Deploy to GitHub Pages**。
6. 选择 **Run workflow → main → Run workflow**。

不要在这一步再创建另一套 Jekyll、Next.js 或静态网站模板工作流，项目已经提供所需配置。

首次上传时 Pages 可能尚未开启，自动触发的一次运行可能失败。在完成上述设置后重新点击 Run workflow 即可。

## 第五步 查看公开网站

当 Actions 中的 `build` 和 `deploy` 都显示绿色勾号后：

1. 打开 **Settings → Pages**，点击 **Visit site**。
2. 或点击 Actions 运行结果中 `github-pages` 的网址。
3. 检查首页、Publications、Projects、CV、完整 statement，以及 CV 下载。
4. 可以用未登录 GitHub 的浏览器窗口检查是否能公开访问。

发布完成后，网站由 GitHub 托管；你的电脑关机也不影响别人访问。GitHub 提示首次更新可能需要几分钟生效，实际网址以 Pages 页面显示为准。

## 以后如何更新

- 个人资料、论文、项目等内容：编辑 `app/content.ts`。
- 完整 statement：编辑 `app/statement-content.ts`。
- 网页 CV：编辑 `app/cv/page.tsx`。
- 更新下载版 CV：替换 `public/ge-tang-cv.pdf`。
- 更新照片：替换 `public/ge-tang.jpg`。

把更改上传并提交到 `main`，现有工作流就会重新发布。不要上传 `node_modules`、`.next`、`out`、`tmp` 或原始 Word 文件。也可以继续让 Codex 帮你编辑并整理更新包。

## 本地验证命令

如果以后需要在电脑上重新生成静态版本，先安装 Node.js 22.13 或更新的 22.x 和 pnpm 11.25.0，再在项目目录运行：

```bash
pnpm install --frozen-lockfile
pnpm build:pages
```

这个命令会生成 `out` 并检查页面、图片、PDF、内部链接和分享信息。GitHub 上的工作流会自动传入正式网址；在本地不设置时使用 localhost。

## 常见问题

- **网站显示 404**：确认仓库名、Public 可见性、Pages 的 Source=GitHub Actions，以及最新一次 Actions 是否成功。
- **看不到 Deploy to GitHub Pages**：检查仓库里的 `.github/workflows/deploy-pages.yml` 是否上传成功。
- **显示原始代码或目录，而不是网站**：请按第四步用 GitHub Actions 发布，不能把源码当作已经生成的网页直接发布。
- **头像、PDF 或样式缺失**：不要手动修改工作流中的网址变量。它们从 GitHub Pages 设置自动读取；若改过仓库名或域名，需要重新运行工作流。
- **第一次构建失败**：打开 Actions，点失败的任务，查看失败步骤。将错误内容发给 Codex 即可排查；不要发送密码或访问令牌。

## 官方参考

- GitHub Pages 入门：https://docs.github.com/en/pages/quickstart
- 使用 GitHub Actions 发布 Pages：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Next.js 静态导出：https://nextjs.org/docs/app/guides/static-exports
