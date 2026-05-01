---
title: 算法入门：经典排序算法可视化
date: 2024-08-10 20:00:00
tags: [算法, Python, 数据结构]
categories: [技术]
cover: /img/covers/sorting-algorithm.jpg
---

排序算法是计算机科学中最基础的算法之一。这篇文章用 Python 实现几种经典排序算法，并配上可视化思路。

## 一、冒泡排序 (Bubble Sort)

冒泡排序重复遍历数组，依次比较相邻元素并交换。每轮遍历后，最大的元素会像气泡一样浮到末尾。

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # 优化：如果一轮中没有交换，说明已经有序
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# 测试
test = [64, 34, 25, 12, 22, 11, 90]
print(f"排序前: {test}")
print(f"排序后: {bubble_sort(test)}")
```

**时间复杂度：** O(n²) | **空间复杂度：** O(1) | **稳定排序：** ✅

## 二、选择排序 (Selection Sort)

每轮从未排序部分找出最小值，放到已排序部分的末尾。

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

test = [64, 25, 12, 22, 11]
print(f"排序后: {selection_sort(test)}")
```

**时间复杂度：** O(n²) | **空间复杂度：** O(1) | **稳定排序：** ❌

## 三、插入排序 (Insertion Sort)

将数组分为已排序和未排序两部分，逐个将未排序元素插入到已排序部分的正确位置。

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

test = [12, 11, 13, 5, 6]
print(f"排序后: {insertion_sort(test)}")
```

**时间复杂度：** O(n²) | **空间复杂度：** O(1) | **稳定排序：** ✅

## 四、快速排序 (Quick Sort)

采用分治策略，选择一个基准元素，将数组分为小于和大于基准的两部分，递归排序。

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

test = [3, 6, 8, 10, 1, 2, 1]
print(f"排序后: {quick_sort(test)}")
```

**时间复杂度：** O(n log n) | **空间复杂度：** O(log n) | **稳定排序：** ❌

## 五、归并排序 (Merge Sort)

采用分治策略，将数组分成两半分别排序，然后合并两个有序数组。

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

test = [38, 27, 43, 3, 9, 82, 10]
print(f"排序后: {merge_sort(test)}")
```

**时间复杂度：** O(n log n) | **空间复杂度：** O(n) | **稳定排序：** ✅

## 六、性能对比

| 算法 | 最好情况 | 平均情况 | 最坏情况 | 空间 | 稳定 |
|------|---------|---------|---------|------|------|
| 冒泡排序 | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| 选择排序 | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| 插入排序 | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| 快速排序 | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| 归并排序 | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |

## 七、可视化思路

在我的算法可视化项目中，用到了以下思路：

1. **条形图表示数据**：每个元素用不同高度的条形表示
2. **颜色区分状态**：蓝色=未排序，红色=正在比较，绿色=已归位
3. **动画延迟**：使用 `setTimeout` 或 `async/await` 控制动画节奏
4. **实时渲染**：每次交换后更新 DOM

```python
# 可视化核心逻辑（伪代码）
async def visualize_sort(arr, draw_func):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            # 标记正在比较的元素
            draw_func(arr, highlights=[j, j+1])
            await sleep(0.1)  # 延迟，观察变化
            
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                # 交换后重新绘制
                draw_func(arr, highlights=[j, j+1])
                await sleep(0.1)
```

---

排序算法虽然基础，但理解它们对提升编程思维有很大帮助。建议你动手实现一遍，再尝试做可视化，会有更深的理解！🚀
