## SQL格式化
> 这一个能将SQL进行格式化漂亮输出的工具、底层使用了AceEditor与Ant Design进行界面设计、sql-formatter作为格式输出工具。

## 使用指南

格式化前
```
SELECT * FROM logTable WHERE user = 'lake'
```

格式化后
```
SELECT
  *
FROM
  logTable
WHERE
  user = 'lake'
```

快捷键
Window：Ctrl+Enter进行预览切换.
Mac：Command+Enter进行预览切换.

## 二次开发
下载react-app框架包
```
yarn install #或者 npm install
```

执行打包
```
bash build.sh
```




