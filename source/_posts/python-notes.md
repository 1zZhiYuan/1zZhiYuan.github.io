---
title: Python 学习笔记：入门到实践
date: 2025-08-15 14:30:00
tags: [Python, 学习笔记]
categories: [技术]
cover: /img/covers/python-notes.jpg
---

Python 是我最喜欢的编程语言之一。这篇笔记整理了入门 Python 的核心知识点，适合初学者参考。

## 一、基础语法

### 变量与数据类型

```python
# 基本类型
name = "ZhiYuan"      # 字符串
age = 20               # 整数
height = 1.75          # 浮点数
is_student = True      # 布尔值

# 复合类型
hobbies = ["编程", "阅读", "游戏"]    # 列表
person = {"name": "ZhiYuan", "age": 20}  # 字典
```

### 条件与循环

```python
# if 语句
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
else:
    print("继续加油")

# for 循环
for i in range(5):
    print(f"第 {i+1} 次循环")

# while 循环
count = 0
while count < 3:
    print(f"计数: {count}")
    count += 1
```

### 函数

```python
def greet(name, language="zh"):
    """打招呼函数"""
    if language == "zh":
        return f"你好，{name}！"
    else:
        return f"Hello, {name}!"

print(greet("ZhiYuan"))
print(greet("ZhiYuan", "en"))
```

## 二、实用技巧

### 列表推导式

```python
# 生成 1 到 10 的平方数
squares = [x**2 for x in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 过滤出偶数
even = [x for x in range(1, 21) if x % 2 == 0]
print(even)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

### 文件读写

```python
# 写入文件
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Hello, Python!")

# 读取文件
with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```

### 异常处理

```python
try:
    num = int(input("请输入一个数字: "))
    result = 100 / num
    print(f"100 / {num} = {result}")
except ValueError:
    print("请输入有效的数字！")
except ZeroDivisionError:
    print("除数不能为 0！")
except Exception as e:
    print(f"发生错误: {e}")
```

## 三、小项目：简易计算器

```python
def calculator():
    print("=== 简易计算器 ===")
    print("操作: +, -, *, /")
    
    try:
        a = float(input("请输入第一个数字: "))
        op = input("请输入运算符: ")
        b = float(input("请输入第二个数字: "))
        
        if op == "+":
            print(f"结果: {a + b}")
        elif op == "-":
            print(f"结果: {a - b}")
        elif op == "*":
            print(f"结果: {a * b}")
        elif op == "/":
            if b != 0:
                print(f"结果: {a / b}")
            else:
                print("除数不能为 0！")
        else:
            print("不支持的运算符")
    except ValueError:
        print("请输入有效的数字！")

if __name__ == "__main__":
    calculator()
```

## 四、学习建议

1. **多动手**：只看不写等于没学，一定要亲自敲代码
2. **从小项目开始**：计算器、待办清单、猜数字游戏都是好的练手项目
3. **善用文档**：Python 官方文档非常详细，遇到问题先查文档
4. **坚持**：每天写一点代码，比一周写一次效果要好得多

---

希望这份笔记对你有帮助！欢迎在评论区交流学习心得 🎯
